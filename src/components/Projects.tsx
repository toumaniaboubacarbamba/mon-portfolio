import Title from "./Title"

import img1 from '../assets/projects/1.png';
import img2 from '../assets/projects/2.png';
import img3 from '../assets/projects/3.png';
import img4 from '../assets/projects/4.png';
import img5 from '../assets/projects/5.png';
import img6 from '../assets/projects/6.png';
import { Github, Video } from "lucide-react";


const projects = [
    {
        id: 1,
        title: 'Plateforme de commentaires de contenu web',
        description: 'Application web permettant aux utilisateurs de commenter tout type de contenu sur internet avec système de modération et notation.',
        technologies: ['Laravel', 'Vue.js', 'MySQL'],
        demoLink: '#',
        repoLink: '#',
        image: img1,
    },
    {
        id: 2,
        title: 'Clone de Trello - Application web',
        description: 'Reproduction des fonctionnalités principales de Trello avec gestion de tableaux, listes et cartes en temps réel.',
        technologies: ['WordPress', 'Vue.js', 'REST API'],
        demoLink: '#',
        repoLink: '#',
        image: img2,
    },
    {
        id: 3,
        title: 'Application mobile Trello',
        description: 'Application mobile interagissant avec l\'API Trello pour gérer vos tableaux et tâches depuis votre smartphone.',
        technologies: ['React Native', 'Trello API', 'Redux'],
        demoLink: '#',
        repoLink: '#',
        image: img3,
    },
    {
        id: 4,
        title: 'Plateforme de billetterie événementielle',
        description: 'Système complet de publication et réservation de tickets d\'événements avec paiement en ligne et gestion des places.',
        technologies: ['React', 'NestJS', 'MongoDB'],
        demoLink: '#',
        repoLink: '#',
        image: img4,
    },
    {
        id: 5,
        title: 'Application de présentation de films',
        description: 'Plateforme similaire à AlloCiné avec fiches films, critiques, notations et système de recommandations.',
        technologies: ['Next.js', 'MongoDB', 'TypeScript'],
        demoLink: '#',
        repoLink: '#',
        image: img5,
    },
    {
        id: 6,
        title: 'Site d\'annonces classées - FreeAds',
        description: 'Marketplace d\'annonces en ligne avec système de recherche, messagerie et gestion des utilisateurs.',
        technologies: ['Laravel', 'MySQL', 'JavaScript'],
        demoLink: '#',
        repoLink: '#',
        image: img6,
    },
];

const Projects = () => {
    return (
        <div className="mt-10" id="Projects">
            <Title title="Mes Projets" />
            <div className="grid md:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="bg-base-300 p-5 h-fit rounded-xl shadow-lg ">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full rounded-xl h-56 object-cover"
                        />
                        <div>
                            <h1 className="my-2 font-bold">
                                {project.title}
                            </h1>
                            <p className="text-sm">{project.description}</p>

                        </div>
                        <div className="flex flex-wrap gap-2 my-3">
                            {project.technologies.map((tech, index) => (
                                <span key={index} className="badge badge-accent badge-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="flex">
                            <a className="btn btn-accent w-2/3" href={project.demoLink}>
                                Demo
                                <Video className="w-4" />
                            </a>

                            <a className="btn btn-neutral w-1/3 ml-2" href={project.repoLink}>
                                <Github className="w-4" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Projects