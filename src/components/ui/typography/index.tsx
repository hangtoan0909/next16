import { ReactNode, ElementType } from 'react';

type FontWeight = 400 | 500 | 600 | 700;

type TypographyProps = {
  children: ReactNode;
  weight?: FontWeight;
  size?: string;
  color?: string;
  className?: string;
  as?: ElementType;
};

export default function Typography({
  children,
  weight = 400,
  size = '14px',
  color = '#7E7E7E',
  className,
  as: Component = 'div',
}: TypographyProps) {
  return (
    <Component
      className={className}
      style={{
        fontSize: size,
        fontWeight: weight,
        color,
        whiteSpace: 'pre-line',
      }}
    >
      {children}
    </Component>
  );
}
