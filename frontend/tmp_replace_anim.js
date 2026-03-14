const fs = require('fs');
const path = 'd:/desktop/APFX/frontend/components/sections/EntryAnimation.tsx';
let content = fs.readFileSync(path, 'utf8');

// replace props
content = content.replace(
    'export default function EntryAnimation({',
    'export default function EntryAnimation({\n    onComplete,\n    onReadyToReveal,\n}: {\n    onComplete: () => void\n    onReadyToReveal?: () => void\n}) {'
);
// remove old props block
content = content.replace(/\s*onComplete,\s*}: {\s*onComplete: \(\) => void\s*}/, '');

// remove lineRef
content = content.replace(/const lineRef = useRef.*\\n/, '');

// update timeline
let tlRegex = /const tl = gsap\.timeline\(\{[\\s\\S]*?\}\)[\s\S]*?(?=return \(\) => \{)/;
let replacementTl = const tl = gsap.timeline({
            defaults: {
                ease: 'power3.out',
            },
            onComplete: () => {
                // Fade out the dark glass overlay
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.7, // 500-700ms 
                    ease: 'power2.inOut',
                    onComplete,
                })
            },
        })

        tl
            /* -- Reveal: logo rises in -------------------- */
            .to(
                logoRef.current,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.85,
                    ease: 'power4.out',
                }
            )
            /* -- Energy: mark glow intensifies ----------- */
            .to(
                markRef.current,
                {
                    boxShadow: '0 0 70px rgba(0, 200, 150, 0.55)',
                    duration: 0.6,
                    ease: 'power2.out',
                },
                '-=0.45'
            )
            /* -- Confirmation: tagline appears ----------- */
            .to(
                tagRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                '-=0.25'
            )
            /* -- Hold: allow brand to register ----------- */
            .to({}, { duration: 1 })
            /* -- Resolve: tagline & logo fade ------------ */
            .to(
                [tagRef.current, logoRef.current],
                {
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        // Apply glass overlay properties
                        if (overlayRef.current) {
                            overlayRef.current.style.background = 'rgba(3, 5, 10, 0.85)';
                            overlayRef.current.style.backdropFilter = 'blur(12px)';
                            overlayRef.current.style.webkitBackdropFilter = 'blur(12px)';
                        }
                        
                        // Signal page to render Hero behind the glass
                        if (onReadyToReveal) onReadyToReveal();
                    }
                }
            )
            // briefly hold the dark glass before GSAP fades out its opacity
            .to({}, { duration: 0.2 })

        ;
content = content.replace(tlRegex, replacementTl);

// remove line JSX
content = content.replace(/<div ref=\{lineRef\} className=\{styles\.line\} \/>\s*/, '');

fs.writeFileSync(path, content);
console.log('Done replacement');
