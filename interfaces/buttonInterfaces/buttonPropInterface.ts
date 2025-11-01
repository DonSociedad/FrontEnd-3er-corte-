import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'google' | 'apple' | 'facebook'; 

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode; 
  icon?: ReactNode; 
  fullWidth?: boolean;
}