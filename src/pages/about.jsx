import { useParams } from "react-router-dom"

const About = () => {

    const {slug} = useParams()
    return (
        <div>hello {slug}</div>
    )
}

export default About