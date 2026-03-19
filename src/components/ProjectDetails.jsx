import { useParams } from "react-router-dom";
import { projectData } from '../data/projects';

export default function ProjectDetails() {
    const { slug } = useParams();

    const project = projectData.find(p => p.slug === slug);

    if (!project) return <h1>Project not found</h1>;

    return (
        <div style={{ padding: "50px" }}>
            <h1>{project.title}</h1>

            <p>{project.description}</p>

            <h3>Tech:</h3>
            <ul>
                {project.tech.map(t => (
                    <li key={t}>{t}</li>
                ))}
            </ul>
        </div>
    );
}
