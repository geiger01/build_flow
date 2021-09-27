import React from "react"
import Animation from '../../assets/animations/animation.webm'

export const SvgAnimation = ({ windowWidth }) => {

    const getWidth = () => {
        if (windowWidth < 450) {
            return windowWidth + 'px'
        }
        else if (windowWidth > 1500) {
            return 1000 + 'px'
        } else {
            return (windowWidth / 1.9) + 'px'
        }
    }

    return (
        <div className="home-page-main-svg-container">
            <video width={getWidth()} autoPlay={true} loop={true} muted={true} playsInline={true} poster="https://secretstache-wpengine.netdna-ssl.com/wp-content/uploads/2021/03/on-demand-web-development-1.svg" className="html-video loaded">
                <source src={Animation} type="video/webm" />
            </video>
        </div>
    )

}