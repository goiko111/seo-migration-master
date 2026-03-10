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
import ss11 from "@/assets/screenshots/ss-11.png";
import ss12 from "@/assets/screenshots/ss-12.png";
import ss13 from "@/assets/screenshots/ss-13.png";
import ss14 from "@/assets/screenshots/ss-14.png";
import ss15 from "@/assets/screenshots/ss-15.png";
import ss16 from "@/assets/screenshots/ss-16.png";
import ss17 from "@/assets/screenshots/ss-17.png";
import ss18 from "@/assets/screenshots/ss-18.png";
import ss19 from "@/assets/screenshots/ss-19.png";
import ss20 from "@/assets/screenshots/ss-20.png";

const imgs = [ss01,ss02,ss03,ss04,ss05,ss06,ss07,ss08,ss09,ss10,ss11,ss12,ss13,ss14,ss15,ss16,ss17,ss18,ss19,ss20];

const ScreenshotReview = () => (
  <div style={{padding:10, background:"#111", display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:8}}>
    {imgs.map((src, i) => (
      <div key={i}>
        <p style={{color:"#fff",fontSize:11,marginBottom:2,fontWeight:"bold"}}>SS-{String(i+1).padStart(2,"0")}</p>
        <img src={src} style={{width:"100%",border:"1px solid #444"}} />
      </div>
    ))}
  </div>
);

export default ScreenshotReview;
