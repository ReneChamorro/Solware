import React, { memo } from 'react';

const MarketingAutomationIllustration = memo(() => {
  return (
    <svg
      viewBox="0 0 1600 900"
      className="w-full h-full"
      style={{ background: 'linear-gradient(to right, #f8fafc, #f1f5f9)' }}
    >
      {/* Grid Background */}
      <defs>
        <pattern
          id="grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Workflow Diagram */}
      <g transform="translate(200, 250)">
        {/* Start Node */}
        <circle cx="0" cy="0" r="30" fill="#0ea5e9" fillOpacity="0.9" />
        <path
          d="M -15 0 L 15 0 M 0 -15 L 0 15"
          stroke="white"
          strokeWidth="4"
        />

        {/* Connection Lines */}
        <path
          d="M 30 0 C 100 0, 100 -100, 170 -100 M 30 0 C 100 0, 100 100, 170 100"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="3"
          strokeDasharray="5,5"
        />

        {/* Email Nodes */}
        <g transform="translate(170, -100)">
          <rect
            x="-25"
            y="-25"
            width="50"
            height="50"
            rx="10"
            fill="#0d9488"
            fillOpacity="0.9"
          />
          <path
            d="M -15 -5 L 15 -5 M -15 5 L 15 5 M -15 15 L 5 15"
            stroke="white"
            strokeWidth="3"
          />
        </g>

        <g transform="translate(170, 100)">
          <rect
            x="-25"
            y="-25"
            width="50"
            height="50"
            rx="10"
            fill="#0d9488"
            fillOpacity="0.9"
          />
          <path
            d="M -15 -5 L 15 -5 M -15 5 L 15 5 M -15 15 L 5 15"
            stroke="white"
            strokeWidth="3"
          />
        </g>

        {/* Branch Connections */}
        <path
          d="M 220 -100 C 290 -100, 290 0, 360 0"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="3"
          strokeDasharray="5,5"
        />
        <path
          d="M 220 100 C 290 100, 290 0, 360 0"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="3"
          strokeDasharray="5,5"
        />

        {/* End Node */}
        <circle
          cx="360"
          cy="0"
          r="30"
          fill="#0ea5e9"
          fillOpacity="0.9"
        />
        <path
          d="M 345 -10 L 360 5 L 375 -10 M 360 5 L 360 15"
          stroke="white"
          strokeWidth="4"
        />
      </g>

      {/* Analytics Widgets */}
      <g transform="translate(800, 200)">
        {/* Conversion Rate Widget */}
        <rect
          x="0"
          y="0"
          width="200"
          height="150"
          rx="10"
          fill="white"
          stroke="#e2e8f0"
          strokeWidth="2"
        />
        <path
          d="M 20 75 L 70 40 L 120 90 L 180 20"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="3"
        />
        <circle cx="70" cy="40" r="4" fill="#0ea5e9" />
        <circle cx="120" cy="90" r="4" fill="#0ea5e9" />
        <circle cx="180" cy="20" r="4" fill="#0ea5e9" />

        {/* Engagement Widget */}
        <rect
          x="220"
          y="0"
          width="200"
          height="150"
          rx="10"
          fill="white"
          stroke="#e2e8f0"
          strokeWidth="2"
        />
        <path
          d="M 240 130 L 240 60 L 280 90 L 320 40 L 360 70 L 400 30"
          fill="none"
          stroke="#0d9488"
          strokeWidth="3"
        />

        {/* ROI Widget */}
        <rect
          x="440"
          y="0"
          width="200"
          height="150"
          rx="10"
          fill="white"
          stroke="#e2e8f0"
          strokeWidth="2"
        />
        <path
          d="M 460 120 C 500 120, 500 40, 540 40 C 580 40, 580 80, 620 80"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="3"
        />
      </g>

      {/* Channel Icons */}
      <g transform="translate(850, 500)">
        {/* Email Icon */}
        <rect
          x="0"
          y="0"
          width="60"
          height="60"
          rx="30"
          fill="#0ea5e9"
          fillOpacity="0.1"
        />
        <path
          d="M 15 20 L 30 35 L 45 20 M 15 20 L 45 20 L 45 40 L 15 40 Z"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="2"
        />

        {/* Social Icon */}
        <rect
          x="80"
          y="0"
          width="60"
          height="60"
          rx="30"
          fill="#0d9488"
          fillOpacity="0.1"
        />
        <circle
          cx="110"
          cy="30"
          r="15"
          fill="none"
          stroke="#0d9488"
          strokeWidth="2"
        />

        {/* Ads Icon */}
        <rect
          x="160"
          y="0"
          width="60"
          height="60"
          rx="30"
          fill="#0ea5e9"
          fillOpacity="0.1"
        />
        <path
          d="M 180 30 L 200 20 L 200 40 L 180 30 Z"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
});

export default MarketingAutomationIllustration;