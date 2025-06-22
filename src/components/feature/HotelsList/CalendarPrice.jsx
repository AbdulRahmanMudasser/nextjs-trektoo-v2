'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const CalendarPrice = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 4, 1));
  const [selectedDate, setSelectedDate] = useState(null);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const generateCalendarData = (month, year) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const weeks = [];
    let week = Array(7).fill(null);
    let dayCounter = 1;
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    // Generate random prices between $100 and $200
    const getRandomPrice = () => `$${Math.floor(Math.random() * 101) + 100}`;

    // Previous month's days
    for (let i = startDay - 1; i >= 0; i--) {
      week[i] = {
        date: prevMonthLastDay - (startDay - 1 - i),
        price: getRandomPrice(),
        isCurrentMonth: false,
      };
    }

    // Current month's days
    for (let i = 0; dayCounter <= lastDay.getDate(); i++) {
      const dayIndex = i % 7;
      if (i > 0 && dayIndex === 0) {
        weeks.push(week);
        week = Array(7).fill(null);
      }
      week[dayIndex] = {
        date: dayCounter,
        price: getRandomPrice(),
        isCurrentMonth: true,
      };
      dayCounter++;
    }

    // Next month's days
    const nextMonthStart = 1;
    for (let i = dayCounter - 1; i % 7 !== 0; i++) {
      week[i % 7] = {
        date: nextMonthStart + (i % 7) - ((dayCounter - 1) % 7),
        price: getRandomPrice(),
        isCurrentMonth: false,
      };
    }
    weeks.push(week);

    return weeks;
  };

  const calendarData = generateCalendarData(
    currentMonth.getMonth(),
    currentMonth.getFullYear()
  );

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
    setSelectedDate(null);
  };

  const handleDateClick = (date, isCurrentMonth) => {
    if (isCurrentMonth) {
      setSelectedDate(
        `${date}-${currentMonth.getMonth() + 1}-${currentMonth.getFullYear()}`
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className="relative w-full max-w-7xl mx-auto mt-12 sm:mt-16 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="w-full bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-blue-50"
        variants={itemVariants}
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6 border-l-4 border-blue-500 pl-3"
          
          variants={itemVariants}
        >
          Calendar & Price
        </motion.h2>
        <div className="relative">
          <div className="border border-blue-50 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-7">
              {daysOfWeek.map((day) => (
                <motion.div
                  key={day}
                  className="py-3 text-center bg-blue-50 text-gray-700 font-semibold text-base border-b border-r border-blue-100 last:border-r-0"
                  
                  variants={itemVariants}
                >
                  {day}
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between items-center bg-blue-500 text-white py-2 px-4">
              <motion.button
                className="p-1.5 hover:bg-blue-600 rounded-full transition"
                aria-label="Previous month"
                onClick={handlePrevMonth}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.div
                className="font-semibold text-base"
                
                variants={itemVariants}
              >
                {currentMonth.toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </motion.div>
              <motion.button
                className="p-1.5 hover:bg-blue-600 rounded-full transition"
                aria-label="Next month"
                onClick={handleNextMonth}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
            {calendarData.map((week, weekIndex) => (
              <motion.div
                key={weekIndex}
                className="grid grid-cols-7"
                variants={containerVariants}
              >
                {week.map((day, dayIndex) => (
                  <Popover key={`${weekIndex}-${dayIndex}`}>
                    <PopoverTrigger asChild>
                      <motion.div
                        className={`min-h-[80px] p-2 border-r border-b border-blue-100 last:border-r-0 hover:bg-blue-50 group cursor-pointer relative ${
                          day &&
                          selectedDate ===
                            `${day.date}-${currentMonth.getMonth() + 1}-${currentMonth.getFullYear()}`
                            ? 'bg-blue-100 text-gray-900'
                            : 'bg-white text-gray-800'
                        } ${day && !day.isCurrentMonth ? 'text-gray-400' : ''}`}
                        onClick={() =>
                          day && handleDateClick(day.date, day.isCurrentMonth)
                        }
                        variants={itemVariants}
                        whileHover={{
                          scale: day && day.isCurrentMonth ? 1.02 : 1,
                        }}
                      >
                        {day && (
                          <div className="text-center">
                            <div
                              className={`text-base font-medium ${
                                selectedDate ===
                                `${day.date}-${currentMonth.getMonth() + 1}-${currentMonth.getFullYear()}`
                                  ? 'text-blue-500'
                                  : 'group-hover:text-blue-500'
                              }`}
                              
                            >
                              {day.date}
                            </div>
                            {day.price && (
                              <div
                                className="text-sm mt-1 text-blue-500 group-hover:text-blue-600"
                                
                              >
                                {day.price}
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    </PopoverTrigger>
                    {day && day.isCurrentMonth && (
                      <PopoverContent className="bg-white shadow-md rounded-md p-4 w-[220px] border border-blue-50">
                        <h3
                          className="text-lg font-bold text-gray-900 mb-2"
                          
                        >
                          General Pricing
                        </h3>
                        <p
                          className="text-gray-600 text-base mb-2"
                          
                        >
                          General price:
                        </p>
                        <div
                          className="text-sm text-gray-600"
                          
                        >
                          <p className="mb-1">
                            Children (0-12):{' '}
                            <span className="text-blue-500 font-medium">
                              $109
                            </span>{' '}
                            / ticket
                          </p>
                          <p className="mb-1">
                            Youth (13-17):{' '}
                            <span className="text-blue-500 font-medium">
                              $129
                            </span>{' '}
                            / ticket
                          </p>
                          <p>
                            Adult (18+):{' '}
                            <span className="text-blue-500 font-medium">
                              $169
                            </span>{' '}
                            / ticket
                          </p>
                        </div>
                      </PopoverContent>
                    )}
                  </Popover>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

CalendarPrice.propTypes = {};

export default CalendarPrice;
