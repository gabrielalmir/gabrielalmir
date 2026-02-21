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

const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, company, period, description }) => (
    <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-6 last:mb-0 pb-6 last:pb-0 border-b border-vesper-orange/10 last:border-0"
    >
        <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-vesper-orange break-words">{title}</h3>
            <p className="text-sm sm:text-base text-foreground/90 font-medium break-words">{company}</p>
            <p className="text-xs sm:text-sm text-foreground/50 flex items-center gap-1.5">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                <span className="break-words">{period}</span>
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed mt-3 break-words">{description}</p>
        </div>
    </m.div>
);

export const ModernResumeSection: React.FC = () => {
    return (
        <LazyMotion features={domAnimation}>
            <section className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                    Resumo Profissional
                </h2>
                <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto px-4">
                    Trajetória, experiências e formação acadêmica
                </p>
            </div>

            <div className="space-y-8 sm:space-y-12">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-vesper-orange/5 border border-vesper-orange/20 rounded-xl p-4 sm:p-6 md:p-8"
                >
                    <h3 className="text-lg sm:text-xl font-bold text-vesper-orange mb-3 sm:mb-4">Sobre</h3>
                    <p className="text-sm sm:text-base text-foreground/80 leading-relaxed break-words">{resumeData.summary}</p>
                </m.div>

                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-background border border-foreground/10 rounded-xl p-4 sm:p-6 md:p-8"
                    >
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
                            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-vesper-orange flex-shrink-0" />
                            <span>Experiência</span>
                        </h3>
                        <div className="space-y-4 sm:space-y-6">
                            {resumeData.experience.map((exp) => (
                                <ExperienceCard key={`${exp.title}-${exp.company}`} {...exp} />
                            ))}
                        </div>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-background border border-foreground/10 rounded-xl p-4 sm:p-6 md:p-8"
                    >
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-vesper-cyan flex-shrink-0" />
                            <span>Formação</span>
                        </h3>
                        <div className="space-y-4 sm:space-y-6">
                            {resumeData.education.map((edu) => (
                                <div key={`${edu.degree}-${edu.institution}`} className="pb-4 sm:pb-6 last:pb-0 border-b border-foreground/10 last:border-0">
                                    <h4 className="text-sm sm:text-base font-bold text-vesper-orange mb-1 break-words">{edu.degree}</h4>
                                    <p className="text-sm sm:text-base text-foreground/80 break-words">{edu.institution}</p>
                                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-foreground/50 mt-2">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                                            <span className="break-words">{edu.period}</span>
                                        </span>
                                        {edu.location && (
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                                                <span className="break-words">{edu.location}</span>
                                            </span>
                                        )}
                                    </div>
                                    {edu.projects && edu.projects.length > 0 && (
                                        <div className="mt-4 space-y-3">
                                            <p className="text-xs sm:text-sm font-semibold text-foreground/70 mb-2">Projetos de destaque:</p>
                                            {edu.projects.map((project) => (
                                                <div key={project.name} className="pl-3 border-l-2 border-vesper-orange/30 space-y-1">
                                                    <p className="text-xs sm:text-sm font-semibold text-vesper-orange/90">{project.name}</p>
                                                    <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">{project.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </m.div>
                </div>

                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-background border border-foreground/10 rounded-xl p-4 sm:p-6 md:p-8"
                >
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
                        <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-vesper-orange flex-shrink-0" />
                        <span>Competências Técnicas</span>
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        {resumeData.skills.map((skill) => (
                            <div key={skill.category} className="space-y-2">
                                <div className="flex items-center gap-2 text-vesper-orange font-semibold text-sm sm:text-base">
                                    <skill.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                                    <h4>{skill.category}</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map((item) => (
                                        <span
                                            key={item}
                                            className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-foreground/5 border border-foreground/10 rounded-full text-foreground/80 whitespace-nowrap"
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
                    className="bg-background border border-foreground/10 rounded-xl p-4 sm:p-6 md:p-8"
                >
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
                        <Award className="w-4 h-4 sm:w-5 sm:h-5 text-vesper-cyan flex-shrink-0" />
                        <span>Certificações Selecionadas</span>
                    </h3>
                    <div className="space-y-6">
                        {resumeData.certifications.map((category) => (
                            <div key={category.category} className="space-y-3">
                                <h4 className="text-sm sm:text-base font-semibold text-vesper-orange">{category.category}</h4>
                                <div className="space-y-2 pl-4 border-l-2 border-vesper-orange/20">
                                    {category.items.map((cert) => (
                                        <div key={cert.name} className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                                            <span className="text-foreground/80 break-words">{cert.name}</span>
                                            <span className="text-foreground/50">·</span>
                                            <span className="text-foreground/50">{cert.year}</span>
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
                    className="bg-background border border-foreground/10 rounded-xl p-4 sm:p-6 md:p-8"
                >
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
                        <Code className="w-4 h-4 sm:w-5 sm:h-5 text-vesper-orange flex-shrink-0" />
                        <span>Projetos Relevantes</span>
                    </h3>
                    <div className="space-y-6">
                        {resumeData.projects.map((project) => (
                            <div key={project.name} className="pb-4 sm:pb-6 last:pb-0 border-b border-foreground/10 last:border-0">
                                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                    <h4 className="text-sm sm:text-base font-bold text-vesper-orange break-words">{project.name}</h4>
                                    {project.url && (
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-xs sm:text-sm text-vesper-orange/70 hover:text-vesper-orange transition-colors"
                                        >
                                            <span>Ver projeto</span>
                                            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                        </a>
                                    )}
                                </div>
                                <p className="text-xs sm:text-sm text-foreground/50 mb-2">{project.period}</p>
                                <p className="text-sm text-foreground/70 leading-relaxed mb-3 break-words">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 text-xs bg-foreground/5 border border-foreground/10 rounded-full text-foreground/70"
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
