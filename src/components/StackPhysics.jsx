import React, { useEffect, useRef } from 'react';

const Matter = window.Matter; 
const PILLS = [
    'Google Analytics 4', 'Google Tag Manager', 'Enhanced Conversions (ECW/ECL)', 'eCommerce Tracking', 
    'Measurement Framework Design', 'Consent Mode v2', 'Amplitude', 'Firebase', 'Looker Studio', 
    'Google Tag', 'Google Ads', 'Data Analysis and Insight Generation', 'Search Ads 360', 'BigQuery', 
    'AppScript', 'JavaScript', 'SQL', 'Google Apps Script', 'Google Cloud Platform', 'React', 
    'Git/Github', 'Chrome DevTools'
];

const getPillWidth = (text) => text.length * 7.5 + 32;
const PILL_HEIGHT = 28;

export default function StackPhysics() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const W = container.offsetWidth;
        const H = container.offsetHeight;

        // Keep track of keys held down for Anti-Gravity
        let isSpacePressed = false;

        const engine = Matter.Engine.create({ gravity: { y: 1.5 } });
        const world = engine.world;

        const render = Matter.Render.create({
            canvas: canvas,
            engine,
            options: {
                width: W,
                height: H,
                background: 'transparent',
                wireframes: false,
                pixelRatio: window.devicePixelRatio || 1,
            },
        });

        // ── Ultra-thick walls
        const wallOpts = { isStatic: true, render: { fillStyle: 'transparent' } };
        const thickness = 400; 
        Matter.Composite.add(world, [
            Matter.Bodies.rectangle(W / 2, H + thickness / 2, W + thickness * 2, thickness, wallOpts), 
            Matter.Bodies.rectangle(-thickness / 2, H / 2, thickness, H * 4, wallOpts),             
            Matter.Bodies.rectangle(W + thickness / 2, H / 2, thickness, H * 4, wallOpts),             
            Matter.Bodies.rectangle(W / 2, -thickness / 2, W + thickness * 2, thickness, wallOpts)  
        ]);

        const mouse = Matter.Mouse.create(canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse,
            constraint: { stiffness: 0.2, render: { visible: false } },
        });
        Matter.Composite.add(world, mouseConstraint);
        render.mouse = mouse;

        // ── Engine Loop Hooks
        Matter.Events.on(engine, 'beforeUpdate', () => {
            // 1. Smoothly flip dragged pills upright
            if (mouseConstraint.body) {
                const body = mouseConstraint.body;
                const targetAngle = 0;
                const currentAngle = body.angle;
                let angleDiff = targetAngle - currentAngle;
                angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
                Matter.Body.setAngle(body, currentAngle + angleDiff * 0.1);
                Matter.Body.setAngularVelocity(body, 0);
            }

            // 2. Anti-Gravity feature loop
            if (isSpacePressed) {
                engine.gravity.y = -0.6; // Float up smoothly like balloons
            } else {
                engine.gravity.y = 1.5;  // Default ground gravity
            }
        });

        // ── Mouse Leave protection
        const handleMouseLeave = () => {
            if (mouseConstraint.body) {
                mouseConstraint.body = null;
                canvas.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, view: window }));
            }
        };
        canvas.addEventListener('mouseleave', handleMouseLeave);

        // ── Keyboard Listeners (Anti-Gravity) attached to canvas
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                isSpacePressed = true;
            }
        };
        const handleKeyUp = (e) => {
            if (e.code === 'Space') {
                isSpacePressed = false;
            }
        };
        canvas.addEventListener('keydown', handleKeyDown);
        canvas.addEventListener('keyup', handleKeyUp);

        // ── Spawn Pills
        const bodies = [];
        const timeouts = [];

        PILLS.forEach((pill, i) => {
            const id = setTimeout(() => {
                const w = getPillWidth(pill);
                const x = Math.random() * (W - w) + w / 2;
                const body = Matter.Bodies.rectangle(x, -PILL_HEIGHT, w, PILL_HEIGHT, {
                    chamfer: { radius: PILL_HEIGHT / 2 },
                    restitution: 0.5, 
                    friction: 0.1,
                    frictionAir: 0.01,
                    label: pill,
                    flashFrames: 0,
                    render: {
                        fillStyle: '#1E1E1E',
                        strokeStyle: '#2A2A2A',
                        lineWidth: 1,
                    },
                });
                Matter.Composite.add(world, body);
                bodies.push(body);
            }, i * 120);
            timeouts.push(id);
        });

        // ── Collision Color Flash
        Matter.Events.on(engine, 'collisionStart', (event) => {
            event.pairs.forEach((pair) => {
                const speedA = pair.bodyA.speed;
                const speedB = pair.bodyB.speed;
                if (!pair.bodyA.isStatic && speedA > 3) pair.bodyA.flashFrames = 12;
                if (!pair.bodyB.isStatic && speedB > 3) pair.bodyB.flashFrames = 12;
            });
        });

        // ── FIXED: Added array check for Query.point results
        Matter.Events.on(mouseConstraint, 'mousedown', (event) => {
            const mousePos = event.mouse.position;
            const queryResults = Matter.Query.point(bodies, mousePos);
            
            if (queryResults && queryResults.length > 0) {
                const clickedBody = queryResults; // Grab the actual body object
                const blastRadius = 300;
                const blastForce = 0.4; 

                clickedBody.flashFrames = 30;

                bodies.forEach((body) => {
                    const dx = body.position.x - clickedBody.position.x;
                    const dy = body.position.y - clickedBody.position.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance > 0 && distance < blastRadius) {
                        const forceX = dx / distance;
                        const forceY = dy / distance;
                        const dropoff = (blastRadius - distance) / blastRadius;

                        Matter.Body.applyForce(body, body.position, {
                            x: forceX * blastForce * dropoff,
                            y: forceY * blastForce * dropoff - 0.11 
                        });

                        body.flashFrames = 20; 
                    }
                });
            }
        });

        // ── Label Rendering loop
        Matter.Events.on(render, 'afterRender', () => {
            const ctx = render.context;
            ctx.font = '500 11px "DM Sans", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            bodies.forEach((body) => {
                const { x, y } = body.position;
                const angle = body.angle;
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);
                
                if (body.flashFrames > 0) {
                    ctx.fillStyle = '#FF5722'; 
                    body.flashFrames--;
                } else {
                    ctx.fillStyle = '#A0A0A0';
                }
                
                ctx.fillText(body.label, 0, 0);
                ctx.restore();
            });
        });

        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);
        Matter.Render.run(render);

        return () => {
            timeouts.forEach(clearTimeout);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('keydown', handleKeyDown);
            canvas.removeEventListener('keyup', handleKeyUp);
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            Matter.Engine.clear(engine);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full cursor-pointer">
            <canvas 
                ref={canvasRef} 
                className="w-full h-full outline-none" 
                tabIndex="0"
                onMouseEnter={() => canvasRef.current?.focus()}
            />
        </div>
    );
}