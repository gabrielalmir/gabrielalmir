import { LazyMotion, domAnimation, m } from 'framer-motion';
import { Award, Calendar, Code, ExternalLink, GraduationCap, MapPin, Wrench } from 'lucide-react';
import React from 'react';
import { resumeData } from './modern-resume-data';

interface ExperienceCardProps {
    title: string;
    company: string;
    period: string;
    description: string;
}

const ExperienceCard: React.FC<ExperienceCardProps & { isLast?: boolean }> = ({ title, company, period, description, isLast }) => (
    <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative pl-8 pb-8 last:pb-0"
    >
        {!isLast && (
            <span className="absolute left-[3px] top-2 bottom-0 w-px bg-gradient-to-b from-vesper-orange/40 via-vesper-orange/15 to-transparent" />
        )}
        <span className="timeline-dot absolute left-0 top-2" />
        <div className="space-y-1.5">
            <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] text-vesper-orange/70 flex items-center gap-1.5">
                <Calendar className="w-3 h-3 flex-shrink-0" />
                <span className="break-words">{period}</span>
            </p>
            <h3 className="text-base sm:text-lg font-bold text-foreground break-words">{title}</h3>
            <p className="text-sm text-vesper-orange/90 font-medium break-words">{company}</p>
            <p className="text-sm text-foreground/65 leading-relaxed mt-3 break-words">{description}</p>
        </div>
    </m.div>
);

export const ModernResumeSection: React.FC = () => {
    return (
        <LazyMotion features={domAnimation}>
            <section className="w-full max-w-6xl mx-auto">
            <div className="mb-14 md:mb-20 w-full max-w-3xl">
                <span className="section-eyebrow">04 / Trajetória</span>
                <h2 className="section-heading mt-4">
                    <span className="text-foreground">Resumo </span>
                    <span className="text-vesper-orange">Profissional</span>
                </h2>
                <p className="section-subheading mt-4">
                    Trajetória, experiências e formação acadêmica.
                </p>
            </div>

            <div className="space-y-8 sm:space-y-10">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-vesper-orange/[0.06] via-background to-vesper-cyan/[0.03] border border-vesper-orange/20 rounded-2xl p-6 sm:p-8 md:p-10 overflow-hidden"
                >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vesper-orange/40 to-transparent" />
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs uppercase tracking-[0.2em] font-mono text-vesper-orange/70 font-semibold">Sobre</span>
                        <div className="h-px flex-1 bg-vesper-orange/15" />
                    </div>
                    <p className="text-base sm:text-lg text-foreground/80 leading-relaxed break-words">{resumeData.summary}</p>
                </m.div>

                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-background/60 backdrop-blur-sm border border-foreground/10 rounded-2xl p-6 sm:p-8"
                    >
                        <h3 className="text-base font-bold text-foreground mb-8 flex items-center gap-2.5 uppercase tracking-[0.15em] text-xs">
                            <Award className="w-4 h-4 text-vesper-orange flex-shrink-0" />
                            <span>Experiência</span>
                            <div className="h-px flex-1 bg-vesper-orange/15" />
                        </h3>
                        <div>
                            {resumeData.experience.map((exp, idx) => (
                                <ExperienceCard
                                    key={`${exp.title}-${exp.company}`}
                                    {...exp}
                                    isLast={idx === resumeData.experience.length - 1}
                                />
                            ))}
                        </div>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-background/60 backdrop-blur-sm border border-foreground/10 rounded-2xl p-6 sm:p-8"
                    >
                        <h3 className="text-base font-bold text-foreground mb-8 flex items-center gap-2.5 uppercase tracking-[0.15em] text-xs">
                            <GraduationCap className="w-4 h-4 text-vesper-cyan flex-shrink-0" />
                            <span>Formação</span>
                            <div className="h-px flex-1 bg-vesper-cyan/15" />
                        </h3>
                        <div>
                            {resumeData.education.map((edu, idx) => {
                                const isLast = idx === resumeData.education.length - 1;
                                return (
                                    <div key={`${edu.degree}-${edu.institution}`} className="relative pl-8 pb-8 last:pb-0">
                                        {!isLast && (
                                            <span className="absolute left-[3px] top-2 bottom-0 w-px bg-gradient-to-b from-vesper-cyan/40 via-vesper-cyan/15 to-transparent" />
                                        )}
                                        <span className="timeline-dot timeline-dot--cyan absolute left-0 top-2" />
                                        <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] text-vesper-cyan/70 mb-1.5">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3 flex-shrink-0" />
                                                <span className="break-words">{edu.period}</span>
                                            </span>
                                            {edu.location && (
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin className="w-3 h-3 flex-shrink-0" />
                                                    <span className="break-words">{edu.location}</span>
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="text-base font-bold text-foreground mb-1 break-words">{edu.degree}</h4>
                                        <p className="text-sm text-vesper-cyan/85 break-words">{edu.institution}</p>
                                        {edu.projects && edu.projects.length > 0 && (
                                            <div className="mt-4 space-y-3">
                                                <p className="text-[10px] uppercase tracking-[0.15em] font-mono text-foreground/50 mb-2">Projetos de destaque</p>
                                                {edu.projects.map((project) => (
                                                    <div key={project.name} className="pl-3 border-l-2 border-vesper-orange/30 space-y-1">
                                                        <p className="text-sm font-semibold text-vesper-orange/90">{project.name}</p>
                                                        <p className="text-xs text-foreground/60 leading-relaxed">{project.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </m.div>
                </div>

                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-background/60 backdrop-blur-sm border border-foreground/10 rounded-2xl p-6 sm:p-8 md:p-10"
                >
                    <h3 className="text-base font-bold text-foreground mb-8 flex items-center gap-2.5 uppercase tracking-[0.15em] text-xs">
                        <Wrench className="w-4 h-4 text-vesper-orange flex-shrink-0" />
                        <span>Competências Técnicas</span>
                        <div className="h-px flex-1 bg-vesper-orange/15" />
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                        {resumeData.skills.map((skill) => (
                            <div key={skill.category} className="space-y-3">
                                <div className="flex items-center gap-2 text-vesper-orange/85 font-semibold text-sm">
                                    <skill.icon className="w-3.5 h-3.5 flex-shrink-0" />
                                    <h4>{skill.category}</h4>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {skill.items.map((item) => (
                                        <span
                                            key={item}
                                            className="px-2.5 py-1 text-xs bg-foreground/[0.04] border border-foreground/10 rounded-md text-foreground/75 whitespace-nowrap font-mono hover:border-vesper-orange/25 hover:text-vesper-orange/90 transition-colors"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </m.div>

                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-background/60 backdrop-blur-sm border border-foreground/10 rounded-2xl p-6 sm:p-8 md:p-10"
                >
                    <h3 className="text-base font-bold text-foreground mb-8 flex items-center gap-2.5 uppercase tracking-[0.15em] text-xs">
                        <Award className="w-4 h-4 text-vesper-cyan flex-shrink-0" />
                        <span>Certificações Selecionadas</span>
                        <div className="h-px flex-1 bg-vesper-cyan/15" />
                    </h3>
                    <div className="space-y-6">
                        {resumeData.certifications.map((category) => (
                            <div key={category.category} className="space-y-3">
                                <h4 className="text-sm font-semibold text-vesper-cyan/85">{category.category}</h4>
                                <div className="space-y-2 pl-4 border-l border-vesper-cyan/20">
                                    {category.items.map((cert) => (
                                        <div key={cert.name} className="flex flex-wrap items-center gap-2 text-sm">
                                            <span className="text-foreground/75 break-words">{cert.name}</span>
                                            <span className="text-foreground/30">·</span>
                                            <span className="text-foreground/45 font-mono text-xs">{cert.year}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </m.div>

                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-background/60 backdrop-blur-sm border border-foreground/10 rounded-2xl p-6 sm:p-8 md:p-10"
                >
                    <h3 className="text-base font-bold text-foreground mb-8 flex items-center gap-2.5 uppercase tracking-[0.15em] text-xs">
                        <Code className="w-4 h-4 text-vesper-orange flex-shrink-0" />
                        <span>Projetos Relevantes</span>
                        <div className="h-px flex-1 bg-vesper-orange/15" />
                    </h3>
                    <div className="space-y-6">
                        {resumeData.projects.map((project) => (
                            <div key={project.name} className="pb-6 last:pb-0 border-b border-foreground/10 last:border-0 group">
                                <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                                    <h4 className="text-base font-bold text-foreground group-hover:text-vesper-orange transition-colors break-words">{project.name}</h4>
                                    {project.url && (
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-xs text-vesper-orange/70 hover:text-vesper-orange transition-colors uppercase tracking-wider font-mono"
                                        >
                                            <span>Ver projeto</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                                <p className="text-[10px] uppercase tracking-[0.18em] text-foreground/45 mb-2 font-mono">{project.period}</p>
                                <p className="text-sm text-foreground/65 leading-relaxed mb-3 break-words">{project.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-0.5 text-[11px] bg-foreground/[0.04] border border-foreground/10 rounded text-foreground/70 font-mono"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </m.div>
            </div>
            </section>
        </LazyMotion>
    );
};
