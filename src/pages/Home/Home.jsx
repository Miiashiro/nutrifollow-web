import TopLayout from "../../components/TopLayout/TopLayout"
import BottomLayout from "../../components/BottomLayout/BottomLayout"

export default function Home(){
    return(
        <div className="home">
            <TopLayout name="Claudio" />

            <BottomLayout />
        </div>
    )
}