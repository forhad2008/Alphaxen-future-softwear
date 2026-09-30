const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const mobilePanel = $("#mobilePanel");
$("#menuBtn").addEventListener("click", () => mobilePanel.classList.toggle("open"));
$$(".mobile-panel a").forEach(a => a.addEventListener("click", () => mobilePanel.classList.remove("open")));

let saved = 0;
const bagBtn = document.getElementById("bagBtn");
if (bagBtn) bagBtn.addEventListener("click", () => showToast(saved ? `${saved} saved font${saved === 1 ? "" : "s"} in your collection.` : "Your font collection is empty."));
const toast = $("#toast");
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(window.__toast);
  window.__toast = setTimeout(()=>toast.classList.remove("show"), 1800);
}
$$(".save-font").forEach(btn => btn.addEventListener("click", () => {
  saved++;
  $("#savedCount").textContent = saved;
  btn.textContent = "✓";
  showToast("Font saved to your collection.");
}));

const preview = $("#previewText");
const family = $("#fontFamily");
const text = $("#fontText");
const size = $("#fontSize");
const tracking = $("#tracking");
const weight = $("#weight");
const opacity = $("#opacity");

function updatePreview(){
  preview.textContent = text.value || "Alphaxen";
  preview.style.fontFamily = family.value;
  preview.style.fontSize = `${size.value}px`;
  preview.style.letterSpacing = `${tracking.value}px`;
  preview.style.fontWeight = weight.value;
  preview.style.opacity = opacity.value / 100;
  $("#fontSizeOut").value = `${size.value}px`;
  $("#fontSizeOut").textContent = `${size.value}px`;
  $("#trackingOut").value = `${tracking.value}px`;
  $("#trackingOut").textContent = `${tracking.value}px`;
  $("#weightOut").value = weight.value;
  $("#weightOut").textContent = weight.value;
  $("#opacityOut").value = `${opacity.value}%`;
  $("#opacityOut").textContent = `${opacity.value}%`;
}
[text,family,size,tracking,weight,opacity].forEach(el => el.addEventListener("input", updatePreview));

$$(".tool-select").forEach(btn => btn.addEventListener("click", ()=>{
  $$(".tool-select").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  preview.style.textAlign = btn.dataset.align;
}));

$$(".swatch").forEach(btn => btn.addEventListener("click", ()=>{
  $$(".swatch").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  preview.style.color = btn.dataset.color;
}));

$("#resetBtn").addEventListener("click", ()=>{
  family.value="Cinzel"; text.value="Alphaxen"; size.value=86; tracking.value=2; weight.value=600; opacity.value=100;
  preview.style.color="#f3f3f3"; preview.style.textAlign="left";
  $$(".tool-select").forEach((b,i)=>b.classList.toggle("active",i===0));
  $$(".swatch").forEach((b,i)=>b.classList.toggle("active",i===0));
  updatePreview(); showToast("Preview reset.");
});

$("#exportBtn").addEventListener("click", ()=>{
  const data = `ALPHAXEN-FONTLAB\nFont: ${family.value}\nText: ${text.value}\nSize: ${size.value}px\nTracking: ${tracking.value}px\nWeight: ${weight.value}`;
  const blob = new Blob([data], {type:"text/plain"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "alphaxen-font-preview.txt";
  a.click();
  URL.revokeObjectURL(a.href);
  showToast("Preview settings exported.");
});

$("#searchBtn").addEventListener("click", ()=>showToast("Search interface ready — connect your font catalog here."));
updatePreview();
