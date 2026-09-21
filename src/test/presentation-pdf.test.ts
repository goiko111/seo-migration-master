import { afterEach, describe, expect, it, vi } from "vitest";
const calls=vi.hoisted(()=>({addPage:vi.fn(),addImage:vi.fn(),link:vi.fn(),save:vi.fn()}));
vi.mock('jspdf',()=>({default:class {
  internal={pageSize:{getWidth:()=>297,getHeight:()=>210}};
  addPage=calls.addPage; addImage=calls.addImage; link=calls.link; save=calls.save;
}}));
vi.mock('html2canvas-pro',()=>({default:vi.fn(async()=>({width:1600,height:900,toDataURL:()=> 'data:image/jpeg;base64,AA=='}))}));
import { generateDeckPdf } from '@/lib/generateDeckPdf';

afterEach(()=>{vi.useRealTimers();document.body.innerHTML='';vi.clearAllMocks();});
describe('shared PDF includes the commercial appendix',()=>{
  it('exports25 pages and restores temporary styles',async()=>{
    vi.useFakeTimers();
    const root=document.createElement('div');root.className='presentation-root';
    for(let i=0;i<25;i++) {const slide=document.createElement('section');slide.className='presentation-slide';slide.scrollIntoView=vi.fn();slide.getBoundingClientRect=()=>({left:0,top:0,width:1600,height:900,right:1600,bottom:900,x:0,y:0,toJSON:()=>({})});root.append(slide);}
    const payment=document.createElement('a');payment.href='https://pagos.winerim.wine/p/tbnxge';payment.dataset.pdfLink='';payment.textContent='Pago';
    payment.getBoundingClientRect=()=>({left:100,top:100,width:300,height:40,right:400,bottom:140,x:100,y:100,toJSON:()=>({})});
    root.lastElementChild?.append(payment);
    document.body.append(root);
    const result=generateDeckPdf('Catalonia Group Condiciones');
    await vi.runAllTimersAsync();await result;
    expect(calls.addPage).toHaveBeenCalledTimes(24);
    expect(calls.addImage).toHaveBeenCalledTimes(25);
    expect(calls.link).toHaveBeenCalledWith(expect.any(Number),expect.any(Number),expect.any(Number),expect.any(Number),{url:'https://pagos.winerim.wine/p/tbnxge'});
    expect(calls.save).toHaveBeenCalledWith('catalonia-group-condiciones.pdf');
    expect(document.getElementById('winerim-pdf-export-style')).toBeNull();
    expect([...root.children].every(child=>(child as HTMLElement).style.width==='')).toBe(true);
  });
});
