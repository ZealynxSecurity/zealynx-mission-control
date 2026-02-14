'use client';

import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Button variant styles using class-variance-authority
const buttonVariants = cva(
  // Base classes
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-primary disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-zealynx-500 text-white hover:bg-zealynx-600 active:bg-zealynx-700 focus:ring-zealynx-500 shadow-sm',
        secondary: 'bg-background-tertiary text-text-primary hover:bg-background-hover active:bg-background-active border border-border-color focus:ring-zealynx-500',
        ghost: 'text-text-secondary hover:text-text-primary hover:bg-background-hover active:bg-background-active focus:ring-zealynx-500',
        success: 'bg-status-success text-white hover:bg-status-success/90 active:bg-status-success/80 focus:ring-status-success shadow-sm',
        warning: 'bg-status-warning text-white hover:bg-status-warning/90 active:bg-status-warning/80 focus:ring-status-warning shadow-sm',
        error: 'bg-status-error text-white hover:bg-status-error/90 active:bg-status-error/80 focus:ring-status-error shadow-sm',
        info: 'bg-status-info text-white hover:bg-status-info/90 active:bg-status-info/80 focus:ring-status-info shadow-sm',
        outline: 'border-2 border-zealynx-500 text-zealynx-500 hover:bg-zealynx-500 hover:text-white active:bg-zealynx-600 focus:ring-zealynx-500',
      },
      size: {
        xs: 'px-2 py-1 text-xs rounded-md h-7',
        sm: 'px-3 py-1.5 text-sm rounded-md h-8',
        md: 'px-4 py-2 text-sm rounded-lg h-10',
        lg: 'px-6 py-3 text-base rounded-lg h-12',
        xl: 'px-8 py-4 text-lg rounded-xl h-14',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

// Button Props Interface
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  badge?: string | number;
}

// Loading Spinner Component
function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-spin rounded-full border-2 border-current border-t-transparent ${className}`} />
  );
}

// Main Button Component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant, 
    size, 
    fullWidth,
    loading = false,
    leftIcon,
    rightIcon,
    badge,
    className = '',
    disabled,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;
    
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, fullWidth, className })}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading State */}
        {loading && (
          <LoadingSpinner className="w-4 h-4 mr-2" />
        )}
        
        {/* Left Icon */}
        {!loading && leftIcon && (
          <span className="mr-2 flex-shrink-0">
            {leftIcon}
          </span>
        )}
        
        {/* Button Content */}
        <span className="flex-1">
          {children}
        </span>
        
        {/* Badge */}
        {badge && (
          <span className="ml-2 bg-white/20 text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
            {badge}
          </span>
        )}
        
        {/* Right Icon */}
        {!loading && rightIcon && (
          <span className="ml-2 flex-shrink-0">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Icon Button Component (for circular buttons with just icons)
export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost' | 'success' | 'warning' | 'error';
  loading?: boolean;
  badge?: string | number;
  tooltip?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ 
    icon, 
    size = 'md', 
    variant = 'secondary',
    loading = false,
    badge,
    tooltip,
    className = '',
    disabled,
    ...props 
  }, ref) => {
    const sizeClasses = {
      xs: 'w-7 h-7',
      sm: 'w-8 h-8',
      md: 'w-10 h-10', 
      lg: 'w-12 h-12',
    };
    
    const iconSizes = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };
    
    const isDisabled = disabled || loading;
    
    return (
      <button
        ref={ref}
        className={`${buttonVariants({ variant, className })} ${sizeClasses[size]} rounded-full relative`}
        disabled={isDisabled}
        title={tooltip}
        {...props}
      >
        {loading ? (
          <LoadingSpinner className={iconSizes[size]} />
        ) : (
          <span className={iconSizes[size]}>
            {icon}
          </span>
        )}
        
        {/* Badge */}
        {badge && (
          <span className="absolute -top-1 -right-1 bg-status-error text-white text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
            {badge}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

// Button Group Component
interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'attached' | 'spaced';
}

export function ButtonGroup({ 
  children, 
  className = '', 
  orientation = 'horizontal',
  variant = 'attached'
}: ButtonGroupProps) {
  const orientationClasses = {
    horizontal: variant === 'attached' 
      ? 'flex [&>button]:rounded-none [&>button:first-child]:rounded-l-lg [&>button:last-child]:rounded-r-lg [&>button:not(:last-child)]:border-r-0'
      : 'flex gap-2',
    vertical: variant === 'attached'
      ? 'flex flex-col [&>button]:rounded-none [&>button:first-child]:rounded-t-lg [&>button:last-child]:rounded-b-lg [&>button:not(:last-child)]:border-b-0'
      : 'flex flex-col gap-2',
  };
  
  return (
    <div className={`${orientationClasses[orientation]} ${className}`}>
      {children}
    </div>
  );
}

// Floating Action Button (FAB)
interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'md' | 'lg';
  loading?: boolean;
  tooltip?: string;
}

export const FAB = forwardRef<HTMLButtonElement, FABProps>(
  ({ 
    icon, 
    position = 'bottom-right',
    size = 'lg',
    loading = false,
    tooltip,
    className = '',
    ...props 
  }, ref) => {
    const positionClasses = {
      'bottom-right': 'fixed bottom-20 right-6 md:bottom-6',
      'bottom-left': 'fixed bottom-20 left-6 md:bottom-6',
      'top-right': 'fixed top-6 right-6',
      'top-left': 'fixed top-6 left-6',
    };
    
    const sizeClasses = {
      md: 'w-14 h-14',
      lg: 'w-16 h-16',
    };
    
    const iconSizes = {
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    };
    
    return (
      <button
        ref={ref}
        className={`
          ${positionClasses[position]} ${sizeClasses[size]}
          bg-zealynx-500 text-white rounded-full shadow-enterprise-lg
          hover:bg-zealynx-600 active:bg-zealynx-700 active:scale-95
          transition-all duration-200 z-40
          flex items-center justify-center
          focus:outline-none focus:ring-2 focus:ring-zealynx-500 focus:ring-offset-2 focus:ring-offset-background-primary
          ${className}
        `}
        title={tooltip}
        {...props}
      >
        {loading ? (
          <LoadingSpinner className={iconSizes[size]} />
        ) : (
          <span className={iconSizes[size]}>
            {icon}
          </span>
        )}
      </button>
    );
  }
);

FAB.displayName = 'FAB';

// Toggle Button Component
interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  children: ReactNode;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({ 
    pressed, 
    onPressedChange,
    children,
    variant = 'default',
    size = 'md',
    className = '',
    ...props 
  }, ref) => {
    const handleClick = () => {
      onPressedChange(!pressed);
    };
    
    const baseClasses = 'transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-zealynx-500 focus:ring-offset-2 focus:ring-offset-background-primary';
    
    const variantClasses = {
      default: pressed 
        ? 'bg-zealynx-500 text-white' 
        : 'bg-background-tertiary text-text-secondary hover:text-text-primary hover:bg-background-hover',
      outline: pressed
        ? 'border-2 border-zealynx-500 bg-zealynx-500 text-white'
        : 'border-2 border-border-color text-text-secondary hover:border-zealynx-500 hover:text-text-primary',
    };
    
    return (
      <button
        ref={ref}
        className={`${buttonVariants({ size })} ${baseClasses} ${variantClasses[variant]} ${className}`}
        onClick={handleClick}
        aria-pressed={pressed}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ToggleButton.displayName = 'ToggleButton';