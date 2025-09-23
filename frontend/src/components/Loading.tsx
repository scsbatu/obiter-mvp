import React from 'react';

interface LoadingProps {
  title?: string;
}

const Loading: React.FC<LoadingProps> = ({ title = 'Loading' }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-background text-foreground">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="animate-spin h-8 w-8 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default Loading;
