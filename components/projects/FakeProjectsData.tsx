interface ProjectInfo {
    imagePath: string;
    topic: string;
    description: string;
    name: string;
}

const fakeProjectsData: ProjectInfo[] = [
    {
        imagePath: "/projects-demo.png",
        topic: "DL",
        description: "A project about developing AI models to solve real-world problems.",
        name: "AI Model Development"
    },
    {
        imagePath: "/projects-demo.png",
        topic: "DL",
        description: "Building responsive and modern web applications.",
        name: "Web Application Development"
    },
    {
        imagePath: "/projects-demo.png",
        topic: "DL",
        description: "Creating user-friendly mobile applications for Android and iOS.",
        name: "Mobile Application Development"
    },
    {
        imagePath: "/projects-demo.png",
        topic: "APs",
        description: "Analyzing data to extract meaningful insights and trends.",
        name: "Data Analysis"
    },
    {
        imagePath: "/projects-demo.png",
        topic: "APs",
        description: "Implementing security measures to protect systems and data.",
        name: "Cybersecurity"
    },
    {
        imagePath: "/projects-demo.png",
        topic: "APs",
        description: "Developing Internet of Things solutions for smart devices.",
        name: "IoT Solutions"
    },
    {
        imagePath: "/projects-demo.png",
        topic: "APs",
        description: "Exploring blockchain technology for secure transactions.",
        name: "Blockchain Technology"
    },
    {
        imagePath: "/projects-demo.png",
        topic: "Others",
        description: "Creating engaging and interactive video games.",
        name: "Video Game Development"
    },
    {
        imagePath: "/projects-demo.png",
        topic: "Others",
        description: "Developing augmented and virtual reality experiences.",
        name: "AR/VR Development"
    },
    {
        imagePath: "/projects-demo.png",
        topic: "Others",
        description: "Building robots for various applications and industries.",
        name: "Robotics"
    }
];

export default fakeProjectsData;