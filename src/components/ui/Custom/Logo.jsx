'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="Trektoo Home"
    >
      <div className="flex items-center justify-center w-24 h-24 md:w-30 md:h-30">
        <Image
          src="/images/logo.png"
          alt="Trektoo Logo"
          width={120}
          height={120}
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}

Logo.propTypes = {
  // No props currently
};

export default Logo;
