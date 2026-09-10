# Akshara cinematic hero

## Goal
Build only the opening scroll experience: a polished, light-theme product story that moves from a premium paint can to emerging tools, a wet paint stroke, and the final Akshara brand message. The reference site informs motion pacing only; all imagery, composition, copy, and visual identity will be original.

## Experience
- Keep the hero pinned through a long, scroll-controlled sequence, with the page scroll directly driving every major motion.
- Open on a minimal studio composition: Akshara wordmark, realistic paint can, soft floor shadow, and a discreet scroll cue.
- Progress through deliberate scenes: can rotation and camera push-in → lid opening → brush, roller, scraper, and tape emerging in sequence → roller crossing the frame and laying down a dimensional orange paint stroke → final brand lockup and calls to action.
- Finish with “Bring Your Space to Life.”, “Explore our products”, and “Visit our store” in a composed end frame.
- Add restrained secondary motion: changing reflections and shadows, subtle depth parallax, refined text masks, magnetic CTA response, and reduced-motion behavior.

## Visual system
- Create an original, high-resolution set of transparent product assets for the can, lid, selected tools, and wet paint texture; layer them for believable depth rather than faking a fragile 3D model.
- Use architectural white and cool pale-blue surfaces, deep navy typography, and a controlled warm orange/golden accent.
- Use a confident geometric display face paired with a highly legible sans serif; load fonts without delaying the initial scene.
- Centralize colors, shadows, timing, typography, and motion fallbacks in the design system; avoid generic gradients, excessive glass, neon, and cartoon styling.

## Build approach
- Add GSAP and ScrollTrigger for one scrubbed master timeline with smooth interpolation and a pinned stage.
- Split the scene into focused React pieces for navigation, product stage, tools, paint reveal, messaging, and timeline setup.
- Use responsive art direction rather than simple scaling: desktop gets the full tool choreography, tablet uses fewer depth layers, and mobile keeps the can opening, two key tools, paint stroke, and brand reveal.
- Keep initial content visible immediately; defer noncritical assets and avoid runtime-heavy 3D dependencies.
- Make navigation usable within the hero experience and ensure the final CTAs have clear, non-broken behavior without building additional site sections.

## Validation
- Verify scroll synchronization, lid/tool continuity, final composition, CTA interactions, and reduced-motion behavior.
- Check desktop, tablet, and mobile layouts for clipping, overlap, and stable frame rate.
- Confirm the page metadata names Akshara Paints & Hardware and the project passes its automated checks.
