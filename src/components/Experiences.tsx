import Title from "./Title"

import imgCSS from "../assets/techno/css.png";
import imgJS from "../assets/techno/js.png";
import imgREACT from "../assets/techno/react.png";
import imgHTML from "../assets/techno/html.png";
import imgNEXT from "../assets/techno/next-js.webp";
import imgNODE from "../assets/techno/node-js.png";
import imgTYPE from "../assets/techno/typescript.svg";
import imgTAILWIND from "../assets/techno/tailwind.png";
import imgMONGODB from "../assets/techno/mongodb.png";
import imgMYSQL from "../assets/techno/mysql.png";
import imgSQLITE from "../assets/techno/sqlite.jpeg";
import imgJAVA from "../assets/techno/java.png";
import imgSPRING from "../assets/techno/springboot.png";
import gs2e from "../assets/companies/gs2e.jpeg";
import imgVUE from "../assets/techno/vue.png";
import imgLaravel from "../assets/techno/laravel.png";
import imgFlutter from "../assets/techno/flutter.png";
import imgReactNative from "../assets/techno/react.png";
import wecode from "../assets/companies/WeCode.png";

const skills = [
    { id: 1, name: "HTML", image: imgHTML },
    { id: 2, name: "CSS", image: imgCSS },
    { id: 3, name: "JavaScript", image: imgJS },
    { id: 4, name: "React", image: imgREACT },
    { id: 5, name: "Node.js", image: imgNODE },
    { id: 6, name: "Tailwind CSS", image: imgTAILWIND },
    { id: 7, name: "TypeScript", image: imgTYPE },
    { id: 8, name: "Next.js", image: imgNEXT },
    { id: 9, name: "MongoDB", image: imgMONGODB },
     { id: 10, name: "Java", image: imgJAVA },
     { id: 11, name: "Spring Boot", image: imgSPRING },
        { id: 12, name: "Vue.js", image: imgVUE },
        { id: 13, name: "Laravel", image: imgLaravel },
    { id: 14, name: "MySQL", image: imgMYSQL },
    { id: 15, name: "SQLite", image: imgSQLITE },
    { id: 16, name: "Flutter", image: imgFlutter },
    { id: 17, name: "React Native", image: imgReactNative },
];


const experiences = [
    {
        id: 1,
        role: "Stagiaire Développeur",
        company: "GS2E",
        period: "2021-2021 (3 mois)",
        description: [
            "Apprentissage et mise en pratique de Java et Spring Boot",
            "Développement de fonctionnalités backend pour des applications d'entreprise",
            "Participation à la conception et à la documentation technique",
            "Collaboration avec l'équipe de développement sur des projets réels",
        ],
        image: gs2e,
    },
    {
        id: 2,
        role: "Bootcamp Développeur Fullstack",
        company: "We.Code - Piloté par Epitech",
        period: "2025 - 2025(6 mois)",
        description: [
            "Formation intensive en développement web fullstack sur 6 mois",
            "Maîtrise des technologies modernes : React, Node.js, Express, MongoDB",
            "Réalisation de projets concrets avec méthodologie agile",
            "Développement d'applications web complètes from scratch",
            "Travail en équipe sur des projets collaboratifs",
            "Préparation aux environnements professionnels de développement",
        ],
        image: wecode,
    },
];

const Experiences = () => {
    return (
        <div id="Experiences">
            <Title title="Expériences" />
            <div className="flex flex-col-reverse md:flex-row justify-center items-center">
                <div className="flex flex-wrap gap-4 justify-center items-center w-full md:w-1/3 mt-4 md:mt-0">
                    {skills.map((skill) => (
                        <div key={skill.id} className="flex justify-center items-center flex-col">
                            <div className="w-24 h-24 p-2 rounded-full border-2 border-accent">
                                <img 
                                    src={skill.image} 
                                    alt={skill.name}
                                    className="object-cover rounded-full h-full w-full"
                                />
                            </div>
                            <span className="mt-2 text-sm">{skill.name}</span>
                        </div>
                    ))}
                </div>

                <div className="md:ml-4 flex flex-col space-y-4 w-full md:w-2/3">
                    {experiences.map((experience) => (
                        <div
                            key={experience.id}
                            className="flex flex-col bg-base-200 p-5 rounded-xl shadow-lg"
                        >
                            <div className="flex items-center">
                                <img
                                    src={experience.image}
                                    alt={experience.company}
                                    className="object-cover h-10 w-10 rounded-full"
                                />
                                <div className="ml-4">
                                    <h1 className="text-xl text-accent font-bold">
                                        {experience.role} , {experience.company}
                                    </h1>
                                    <span className="text-sm">{experience.period}</span>
                                </div>
                            </div>
                            <ul className="list-disc ml-16 mt-2">
                                {experience.description.map((desc, index) => (
                                    <li key={index}>
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Experiences