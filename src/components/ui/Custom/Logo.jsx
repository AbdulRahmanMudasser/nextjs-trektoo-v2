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
      <div className="flex items-center justify-center w-36 h-[2.125rem] md:w-40 md:h-[2.625rem] lg:w-44 lg:h-[3.125rem] rounded-sm">
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
