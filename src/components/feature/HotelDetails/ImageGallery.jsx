'use client';

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Grid3X3,
} from 'lucide-react';

const ImageWithFallback = ({
  src,
  alt,
  onLoad,
  priority = false,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Clean and validate image URL
  const cleanImageUrl = (url) => {
    if (!url || typeof url !== 'string') return null;
    // Remove trailing quotes and whitespace
    let cleanedUrl = url
      .trim()
      .replace(/["']+$/, '')
      .replace(/^["']+/, '');
    // Check for common invalid patterns
    if (
      cleanedUrl === '' ||
      cleanedUrl === 'null' ||
      cleanedUrl === 'undefined'
    )
      return null;
    return cleanedUrl;
  };

  const isValidImageUrl = (url) => {
    if (!url) return false;
    // Check if it's a valid URL format
    try {
      new URL(url);
      return true;
    } catch {
      // If it's not a valid absolute URL, check if it's a valid relative path
      return (
        url.startsWith('/') || url.startsWith('./') || url.startsWith('../')
      );
    }
  };

  const cleanedSrc = cleanImageUrl(src);
  const validSrc = cleanedSrc && isValidImageUrl(cleanedSrc);

  // Enhanced error handling with better logging
  const handleImageError = (e) => {
    console.error('Image load error:', {
      originalSrc: src,
      cleanedSrc,
      error: e.message,
      timestamp: new Date().toISOString(),
    });
    setHasError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    onLoad?.();
    // Reset error state if image loads successfully
    if (hasError) setHasError(false);
  };

  return (
    <div className="relative w-full h-full">
      {hasError || !validSrc ? (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center">
          <div className="text-gray-400 mb-2">
            <Grid3X3 className="h-12 w-12" />
          </div>
          <span className="text-gray-500 text-sm font-medium">
            Image Unavailable
          </span>
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <img
            src={cleanedSrc}
            alt={alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
        </>
      )}
    </div>
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onLoad: PropTypes.func,
  priority: PropTypes.bool,
};

const ImageModal = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
}) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [imageLoadStates, setImageLoadStates] = useState({});

  const dragX = useMotionValue(0);
  const dragOpacity = useTransform(dragX, [-300, 0, 300], [0.3, 1, 0.3]);

  const controlsTimeout = useRef(null);

  const resetImageState = useCallback(() => {
    setZoom(1);
    setRotation(0);
    setPanOffset({ x: 0, y: 0 });
    dragX.set(0);
  }, [dragX]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetImageState();
  }, [images.length, setCurrentIndex, resetImageState]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetImageState();
  }, [images.length, setCurrentIndex, resetImageState]);

  const handleImageLoad = useCallback((index) => {
    setImageLoadStates((prev) => ({ ...prev, [index]: true }));
  }, []);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || zoom > 1) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.5, 4));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.5, 1));
  const handleRotate = () => setRotation((prev) => prev + 90);

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === 'r' || e.key === 'R') {
        handleRotate();
      }
      showControlsTemporarily();
    },
    [nextImage, prevImage, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      showControlsTemporarily();
    } else {
      document.body.style.overflow = 'unset';
      resetImageState();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    };
  }, [isOpen, handleKeyDown, resetImageState]);

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        prevImage();
      } else {
        nextImage();
      }
    } else {
      dragX.set(0);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onMouseMove={showControlsTemporarily}
      >
        {/* Top Controls */}
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 z-20"
          initial={{ y: -100 }}
          animate={{ y: showControls ? 0 : -100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-white text-lg font-semibold">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ZoomOut className="h-5 w-5" />
              </motion.button>
              <motion.button
                onClick={handleZoomIn}
                disabled={zoom >= 4}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ZoomIn className="h-5 w-5" />
              </motion.button>
              <motion.button
                onClick={handleRotate}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <RotateCw className="h-5 w-5" />
              </motion.button>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Image Container */}
        <motion.div
          className="relative max-w-[95vw] max-h-[95vh] w-full mx-4"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ opacity: dragOpacity }}
        >
          <motion.div
            key={currentIndex}
            className="relative w-full h-[80vh] rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -50 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            drag={zoom === 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ x: dragX }}
          >
            <motion.div
              className="w-full h-full"
              animate={{
                scale: zoom,
                rotate: rotation,
                x: panOffset.x,
                y: panOffset.y,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 35,
                mass: 0.8,
              }}
            >
              <ImageWithFallback
                src={images[currentIndex]}
                alt={`Gallery Image ${currentIndex + 1}`}
                className="w-full h-full object-contain select-none"
                onLoad={() => handleImageLoad(currentIndex)}
              />
            </motion.div>
          </motion.div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <motion.div
              className="absolute inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={prevImage}
                className="ml-4 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all pointer-events-auto"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="h-8 w-8" />
              </motion.button>

              <motion.button
                onClick={nextImage}
                className="mr-4 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all pointer-events-auto"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="h-8 w-8" />
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Bottom Controls & Indicators */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 z-20"
          initial={{ y: 100 }}
          animate={{ y: showControls ? 0 : 100 }}
          transition={{ duration: 0.3 }}
        >
          {images.length > 1 && (
            <div className="flex justify-center space-x-2 mb-4">
              {images.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    resetImageState();
                  }}
                  className={`relative overflow-hidden rounded transition-all duration-300 ${
                    index === currentIndex ? 'ring-2 ring-white' : ''
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="w-12 h-8 relative">
                    <ImageWithFallback
                      src={images[index]}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {!imageLoadStates[index] && (
                      <div className="absolute inset-0 bg-gray-600 animate-pulse" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          <div className="text-center">
            <p className="text-white/80 text-sm">
              Use arrow keys or swipe to navigate • Press ESC to close • Scroll
              to zoom
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentIndex: PropTypes.number.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
};

const ImageGallery = ({
  images = [],
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const galleryRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalIndex, setCurrentModalIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const scrollAmount = 300;

  const updateScrollButtons = useCallback(() => {
    if (galleryRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  const scrollLeft = useCallback(() => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 300);
    }
  }, [updateScrollButtons]);

  const scrollRight = useCallback(() => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 300);
    }
  }, [updateScrollButtons]);

  const openModal = useCallback((index) => {
    setCurrentModalIndex(index);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleImageLoad = useCallback((index) => {
    setLoadedImages((prev) => new Set([...prev, index]));
  }, []);

  // Enhanced auto-scroll with smooth transitions
  useEffect(() => {
    if (!isAutoPlaying || isModalOpen) return;

    const gallery = galleryRef.current;
    let scrollInterval;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (gallery) {
          const { scrollLeft, scrollWidth, clientWidth } = gallery;
          const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 5;

          if (isAtEnd) {
            gallery.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            gallery.scrollBy({ left: 2, behavior: 'auto' });
          }
          updateScrollButtons();
        }
      }, autoPlayInterval / 100);
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
    };

    gallery?.addEventListener('mouseenter', stopAutoScroll);
    gallery?.addEventListener('mouseleave', startAutoScroll);

    if (isAutoPlaying) startAutoScroll();

    return () => {
      stopAutoScroll();
      gallery?.removeEventListener('mouseenter', stopAutoScroll);
      gallery?.removeEventListener('mouseleave', startAutoScroll);
    };
  }, [isAutoPlaying, isModalOpen, autoPlayInterval, updateScrollButtons]);

  // Initialize scroll buttons
  useEffect(() => {
    updateScrollButtons();
    const gallery = galleryRef.current;
    gallery?.addEventListener('scroll', updateScrollButtons);

    return () => {
      gallery?.removeEventListener('scroll', updateScrollButtons);
    };
  }, [images, updateScrollButtons]);

  const handleKeyDown = useCallback(
    (e) => {
      if (isModalOpen) return;

      if (e.key === 'ArrowLeft') {
        scrollLeft();
      } else if (e.key === 'ArrowRight') {
        scrollRight();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPlaying((prev) => !prev);
      }
    },
    [isModalOpen, scrollLeft, scrollRight]
  );

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { y: 30, opacity: 0, scale: 0.95 },
      visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 120,
          damping: 25,
          mass: 0.8,
        },
      },
    }),
    []
  );

  if (!images.length) {
    return (
      <motion.div
        className="relative w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center py-16" variants={itemVariants}>
          <Grid3X3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            No images available for this gallery.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        className="relative w-full py-8 sm:py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery Header */}
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0"
            variants={itemVariants}
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Image Gallery
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {images.length} {images.length === 1 ? 'image' : 'images'}
              </p>
            </div>
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                isAutoPlaying
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAutoPlaying ? 'Pause' : 'Play'} Auto-scroll
            </motion.button>
          </motion.div>

          <motion.div className="relative" variants={itemVariants}>
            {/* Left Arrow */}
            <motion.button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 -ml-2 sm:-ml-6 md:-ml-12 z-10 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 ${
                canScrollLeft
                  ? 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer shadow-blue-200/50'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
              whileHover={canScrollLeft ? { scale: 1.1, x: -2 } : {}}
              whileTap={canScrollLeft ? { scale: 0.9 } : {}}
            >
              <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
            </motion.button>

            {/* Images Container */}
            <div
              ref={galleryRef}
              className="w-full overflow-x-hidden whitespace-nowrap flex items-center gap-2 sm:gap-4 md:gap-6 py-2 sm:py-4 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {images.map((src, index) => (
                <motion.div
                  key={index}
                  className="relative w-64 sm:w-72 md:w-80 lg:w-96 h-48 sm:h-56 md:h-64 lg:h-80 flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -8 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                    mass: 0.6,
                  }}
                  onClick={() => openModal(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <ImageWithFallback
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110"
                    onLoad={() => handleImageLoad(index)}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out" />

                  {/* Loading State */}
                  {!loadedImages.has(index) && (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  {/* Hover Effects */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <motion.div
                          className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Maximize2 className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Image Counter */}
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {index + 1} / {images.length}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Arrow */}
            <motion.button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 -mr-2 sm:-mr-6 md:-mr-12 z-10 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 ${
                canScrollRight
                  ? 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer shadow-blue-200/50'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
              whileHover={canScrollRight ? { scale: 1.1, x: 2 } : {}}
              whileTap={canScrollRight ? { scale: 0.9 } : {}}
            >
              <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
            </motion.button>
          </motion.div>

          {/* Keyboard Shortcuts Info */}
          <motion.div
            className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500 px-2"
            variants={itemVariants}
          >
            Use arrow keys to navigate • Space to pause/play • Click any image
            to view fullscreen
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={images}
        currentIndex={currentModalIndex}
        setCurrentIndex={setCurrentModalIndex}
      />
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  autoPlay: PropTypes.bool,
  autoPlayInterval: PropTypes.number,
};

export default ImageGallery;
