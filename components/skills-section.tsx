'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useLocale } from '@/app/contexts/locale-context';

const skillCategories = [
  {
    titleKey: 'Languages',
    color: '#B8A000',
    techs: [
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    ],
  },
  {
    titleKey: 'Frontend',
    color: '#06B6D4',
    techs: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    titleKey: 'Backend',
    color: '#3C873A',
    techs: [
      { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    ],
  },
  {
    titleKey: 'Tools & DevOps',
    color: '#F05032',
    techs: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'CI/CD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
    ],
  },
  {
    titleKey: 'AI & ML',
    color: '#FF6F00',
    techs: [
      { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'Scikit-learn', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
    ],
  },
];

const additionalSkills = [
  'REST APIs', 'Microservices', 'Cloud Deployment',
  'Database Design', 'UI/UX', 'Performance Optimization',
  'Automation', 'Medical AI',
];

function usePngDataUrl(svgUrl: string) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!svgUrl) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, 256, 256);
      setDataUrl(canvas.toDataURL('image/png'));
    };
    img.onerror = () => console.warn(`Failed to load icon: ${svgUrl}`);
    img.src = svgUrl;
  }, [svgUrl]);

  return dataUrl;
}

function Ball({ pngUrl }: { pngUrl: string }) {
  const [decal] = useTexture([pngUrl]);
  const meshRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.4;
  });

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh ref={meshRef} castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#1a1f35" polygonOffset polygonOffsetFactor={-5} flatShading />
        <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} scale={1} map={decal} />
        <Decal position={[0, 0, -1]} rotation={[2 * Math.PI, Math.PI, 6.25]} scale={1} map={decal} />
        <Decal position={[-1, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={1} map={decal} />
        <Decal position={[1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={1} map={decal} />
      </mesh>
    </Float>
  );
}

function BallCanvas({ icon }: { icon: string }) {
  const pngUrl = usePngDataUrl(icon);

  if (!pngUrl) return <div className="w-full h-full rounded-full bg-slate-800/60 animate-pulse" />;

  return (
    <Canvas frameloop="always" dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} />
        <Ball pngUrl={pngUrl} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}

export function SkillsSection() {
  const { t } = useLocale();

  return (
    <section className="relative py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-3">
            {t('skills.subtitle')}
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            {t('skills.title1')} <span className="text-cyan-400">{t('skills.title2')}</span>
          </h2>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-col gap-16">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.07 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[2px] rounded-full" style={{ background: cat.color }} />
                <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: cat.color }}>
                  {cat.titleKey}
                </h3>
                <div className="flex-1 h-[1px] bg-white/[0.06]" />
              </div>

              <div className="flex flex-row flex-wrap justify-center gap-10">
                {cat.techs.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    className="flex flex-col items-center gap-3"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                  >
                    <div className="w-28 h-28">
                      <BallCanvas icon={tech.icon} />
                    </div>
                    <span className="text-xs font-medium text-slate-400 text-center">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional expertise */}
        <motion.div
          className="mt-20 px-6 py-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-slate-500 whitespace-nowrap">
              {t('skills.additional')}
            </p>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          <div className="flex flex-wrap gap-2">
            {additionalSkills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                whileHover={{ scale: 1.04, transition: { duration: 0.12 } }}
                className="group flex items-center gap-2 px-3.5 py-2 rounded-[10px] border border-white/[0.08] bg-white/[0.03] hover:border-cyan-500/35 hover:bg-cyan-500/[0.06] transition-colors cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 group-hover:bg-cyan-400 transition-colors flex-shrink-0" />
                <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 transition-colors whitespace-nowrap">
                  {skill}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}