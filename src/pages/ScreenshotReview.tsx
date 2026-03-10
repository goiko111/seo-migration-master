import ss01 from "@/assets/screenshots/ss-01.png";
import ss02 from "@/assets/screenshots/ss-02.png";
import ss03 from "@/assets/screenshots/ss-03.png";
import ss04 from "@/assets/screenshots/ss-04.png";
import ss05 from "@/assets/screenshots/ss-05.png";
import ss06 from "@/assets/screenshots/ss-06.png";
import ss07 from "@/assets/screenshots/ss-07.png";
import ss08 from "@/assets/screenshots/ss-08.png";
import ss09 from "@/assets/screenshots/ss-09.png";
import ss10 from "@/assets/screenshots/ss-10.png";

const imgs = [ss01,ss02,ss03,ss04,ss05,ss06,ss07,ss08,ss09,ss10];

const ScreenshotReview = () => (
  <div style={{padding:20, background:"#111", display:"grid", gridTemplateColumns:"1fr 1fr", gap:20}}>
    {imgs.map((src, i) => (
      <div key={i}>
        <h3 style={{color:"#fff",fontSize:18,marginBottom:4}}>SS-{String(i+1).padStart(2,"0")}</h3>
        <img src={src} style={{width:"100%",border:"1px solid #444"}} />
      </div>
    ))}
  </div>
);

export default ScreenshotReview;
