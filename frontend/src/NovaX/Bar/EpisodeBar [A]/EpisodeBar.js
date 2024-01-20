import './EpisodeBar.css';

const EpisodeBar = ({title, design = 1, ...rest}) =>
{
    let klasy = "";
    if(design > 0) klasy = "EpisodeBar";

    return (
        <div {...rest} className={klasy}>
            <div className={"EpisodeBar-Duży"}>1. {title}</div>
            <div className={"EpisodeBar-Średni"}>
                Otwarte<br/>123
            </div>
            <div className={"EpisodeBar-Mały"}>2/5</div>
        </div>
    );
}

export default EpisodeBar;