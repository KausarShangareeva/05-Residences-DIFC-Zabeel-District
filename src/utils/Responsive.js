// Responsive Breakpoints

export const breakpoints = {
  // Mobile devices
  xs: '320px',      // Extra small devices
  sm: '480px',      // Small devices (phones)

  // Tablets
  md: '768px',      // Medium devices (tablets)
  lg: '1024px',     // Large devices (landscape tablets)

  // Desktops
  xl: '1200px',     // Extra large devices (desktops)
  xxl: '1440px',    // XX large devices (large desktops)
  xxxl: '1920px',   // XXX large devices (ultra-wide)
}

// Media Query Helpers
export const devices = {
  mobileXS: `(min-width: ${breakpoints.xs})`,
  mobileSM: `(min-width: ${breakpoints.sm})`,
  tablet: `(min-width: ${breakpoints.md})`,
  tabletLG: `(min-width: ${breakpoints.lg})`,
  desktop: `(min-width: ${breakpoints.xl})`,
  desktopXL: `(min-width: ${breakpoints.xxl})`,
  desktopXXL: `(min-width: ${breakpoints.xxxl})`,
}

// Max-width Media Queries (for mobile-first approach)
export const maxDevices = {
  mobileXS: `(max-width: ${breakpoints.xs})`,
  mobileSM: `(max-width: ${breakpoints.sm})`,
  tablet: `(max-width: ${breakpoints.md})`,
  tabletLG: `(max-width: ${breakpoints.lg})`,
  desktop: `(max-width: ${breakpoints.xl})`,
  desktopXL: `(max-width: ${breakpoints.xxl})`,
}

// Usage in styled-components (if needed):
// const StyledComponent = styled.div`
//   padding: 2rem;
//
//   @media ${devices.tablet} {
//     padding: 4rem;
//   }
// `;

// For CSS-in-JS or inline usage
export const mediaQuery = (breakpoint) => {
  return `@media (min-width: ${breakpoint})`;
}

export const mediaQueryMax = (breakpoint) => {
  return `@media (max-width: ${breakpoint})`;
}

// Between breakpoints
export const between = (minBreakpoint, maxBreakpoint) => {
  return `@media (min-width: ${minBreakpoint}) and (max-width: ${maxBreakpoint})`;
}

export default {
  breakpoints,
  devices,
  maxDevices,
  mediaQuery,
  mediaQueryMax,
  between,
}
