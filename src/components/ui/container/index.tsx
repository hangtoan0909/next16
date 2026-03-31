import React from 'react';

type SectionProps = {
  children: React.ReactNode;

  /** full viền hay boxed */
  fullBleed?: boolean;

  /** max width của content */
  maxWidth?: number | string;

  /** padding ngang */
  padding?: number | string;

  /** padding dọc */
  paddingY?: number | string;

  /** background */
  background?: string;

  /** borderRadius */
  borderRadius?: number;

  /** style ngoài */
  className?: string;

  /** style cho content */
  contentStyle?: React.CSSProperties;

  /** tag render ra: section | div | main | header... */
  as?: React.ElementType;
};

export function AppContainer({
  children,
  fullBleed = false,
  maxWidth = 1200,
  padding = 16,
  paddingY,
  background,
  borderRadius = 0,
  className,
  contentStyle,
  as: Tag = 'section',
}: SectionProps) {
  const resolvedPaddingY = paddingY ?? padding;

  const containerStyle: React.CSSProperties = {
    maxWidth: fullBleed ? undefined : maxWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: padding,
    paddingRight: padding,
    paddingTop: resolvedPaddingY,
    paddingBottom: resolvedPaddingY,
    ...contentStyle,
  };

  return (
    <Tag
      style={{
        width: '100%',
        background,
        borderRadius,
      }}
      className={className}
    >
      <div style={containerStyle}>{children}</div>
    </Tag>
  );
}
