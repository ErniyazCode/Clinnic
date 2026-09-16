const fs = require('fs');

['content_en.json', 'content.json', 'content_kz.json'].forEach(f => {
    let data = JSON.parse(fs.readFileSync(`src/data/${f}`, 'utf8'));
    let hasGenco = false, hasAibota = false;
    let doctorsList = data.doctors ? data.doctors.doctorsList : data.doctorsList;
    if (!Array.isArray(doctorsList)) doctorsList = [];
    
    if (doctorsList.length > 0) {
        let ahmetcan = doctorsList.find(x => typeof x.name === 'string' && x.name.includes('Ahmetcan'));
        hasGenco = ahmetcan ? ahmetcan.name : 'Not found Ahmetcan';
        
        let aibotaNames = doctorsList.filter(x => typeof x.name === 'string' && (x.name.includes('Aibota') || x.name.includes('Айбота') || x.name.includes('Мурат') || x.name.includes('Мұрат'))).map(x => x.name);
        hasAibota = aibotaNames.length > 0 ? aibotaNames.join(', ') : 'Not found Aibota';
    }
    
    // Also let's find the Exact Treatment string
    let trDesc = '?';
    if(data.values && data.values.benefits) {
        let tr = data.values.benefits.find(b => b.desc && (b.desc.includes('Istanbul, London') || b.desc.includes('Turkey, Europe') || b.desc.includes('Турции, Европы')));
        if (tr) trDesc = tr.desc;
    }
    
    console.log(`[${f}] Aibota: ${hasAibota}, Ahmetcan: ${hasGenco}, TR: ${trDesc}`);
});