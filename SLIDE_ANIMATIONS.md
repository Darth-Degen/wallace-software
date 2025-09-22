# Slide Animation System

This system provides a comprehensive solution for managing Framer Motion animations across slides with support for both page loads and slide transitions with proper exit animations.

## Features

- **Per-slide animation configurations**: Each slide can have unique animations
- **Page load animations**: Triggered when users land directly on a slide via routing
- **Directional slide transitions**: Proper enter/exit animations based on navigation direction
- **Staggered exit animations**: Elements animate out in sequence before new slide enters
- **Navigation-aware animations**: Right arrow = exit left, enter right; Left arrow = exit right, enter left
- **Reusable components**: Clean separation of concerns with composable components

## Core Components

### `AnimatedSlide`

A wrapper component that handles all animation logic for slide content.

```tsx
<AnimatedSlide
  slideType="home"
  slideData={slideData.home}
  animationTrigger="pageLoad" // or "slideTransition"
  className="custom-styles"
  titleClassName="text-blue-600"
/>
```

### Individual Slide Components

Each slide component now accepts an `animationTrigger` prop:

```tsx
<HomeSlide animationTrigger="pageLoad" />
<AboutSlide animationTrigger="slideTransition" />
```

## Animation Configuration

### Slide Data

Each slide has associated content in `src/constants/slideData.ts`:

```tsx
export const slideData: Record<SlideType, SlideData> = {
  home: {
    id: "home",
    title: "Welcome to Wallace Software",
    description: "Building innovative digital solutions...",
  },
  // ... other slides
};
```

### Animation Configurations

Slide-specific animations are defined in `src/constants/slideAnimations.ts`:

```tsx
export const slideAnimations: Record<SlideType, SlideAnimationConfig> = {
  home: {
    pageLoad: createPageLoadAnimations(0.3, 0.6),
    slideTransition: createSlideTransitionAnimations("scale", "scale"),
  },
  // ... other slides with unique animations
};
```

## Animation Types

### Page Load Animations

- **Container**: Fades in with staggered children
- **Title**: Slides up with scale effect and custom delay
- **Description**: Slides up with separate delay for staggered effect

### Slide Transition Animations

- **Directional options**: left, right, up, down, scale
- **Enter animations**: Content slides in from specified direction
- **Exit animations**: Content slides out in specified direction

## Animation Flow with Exit Sequences

### **Navigation Direction Logic**

- **Right Arrow (Next)**: Current slide exits left, new slide enters from right
- **Left Arrow (Previous)**: Current slide exits right, new slide enters from left
- **Page Load**: Elements fade/scale/slide up with staggered timing

### **Exit Animation Sequence**

1. **User clicks navigation arrow**
2. **Container begins exit** (coordinates overall timing)
3. **Children exit with reverse stagger** (last element out first)
4. **Individual AnimatedChild components** animate out based on their exit variants
5. **New slide container enters** from opposite direction
6. **New slide children enter** with forward stagger
7. **Complete transition** with smooth handoff

### **Stagger Timing**

- **Exit stagger**: 0.03s intervals, reverse order (-1 staggerDirection)
- **Enter stagger**: 0.05s intervals, normal order
- **Container coordination**: Uses "afterChildren" and "beforeChildren"
- **Overall timing**: Fast exits (0.3s), medium enters (0.5s)

## Usage Patterns

### 1. Direct Slide Usage

```tsx
import { HomeSlide } from "@components/custom/slides";

const MyPage = () => <HomeSlide animationTrigger="pageLoad" />;
```

### 2. Carousel Implementation

```tsx
import { SlideCarousel } from "@components/custom";

const MyCarousel = () => <SlideCarousel />;
```

### 3. Custom Hook for Animation State

```tsx
import { useSlideAnimations } from "@hooks";

const MyComponent = () => {
  const { animationTrigger, isTransitioning } = useSlideAnimations({
    currentSlide: "home",
    previousSlide: "about",
  });

  // Use animationTrigger and isTransitioning as needed
};
```

## Customization

### Adding New Slides

1. Add slide type to `SlideType` in `src/types/slideAnimations.ts`
2. Add slide data to `slideData` in `src/constants/slideData.ts`
3. Add animation config to `slideAnimations` in `src/constants/slideAnimations.ts`
4. Create slide component following the existing pattern

### Customizing Animations

- Modify timing constants in `slideAnimations.ts`
- Adjust easing curves for different animation feels
- Change directional animations per slide
- Customize delays for staggered effects

## Performance Notes

- Uses `AnimatePresence` for smooth transitions
- Optimized with proper exit animations
- Minimal re-renders with proper key management
- Responsive animations that respect user preferences

## Example Integration

The `SlideCarousel` component demonstrates a complete implementation with:

- Slide navigation controls
- Animation state management
- Visual indicators
- Smooth transitions between slides
- Proper cleanup and state management
