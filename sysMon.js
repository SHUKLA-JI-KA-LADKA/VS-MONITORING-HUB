const si = require('systeminformation');
const { ipcMain } = require('electron')
const os = require('os');

//system monitoring
const sysMon = () => {



    ipcMain.on('os-info', e => {
        // CPU information
        si.osInfo().then(osi=>{
        const osInfo=[];
        osInfo.push(osi.platform);
        //osInfo
        e.sender.send('os-info',osInfo);
        //console.log(cpuInfo);
        }).catch(error => console.error(error));
    });

    ipcMain.on('cpu-info', e => {
        // CPU information
        si.cpu().then(cpu=>{
        const cpuInfo=[];
        cpuInfo.push(cpu.manufacturer,cpu.brand,cpu.cores);
        //console.log(cpu['manufacturer']);
        //cpuInfo.push(cpu['brand']);
        //cpuInfo.push(cpu['cores']);
        e.sender.send('cpu-info',cpuInfo);
        //console.log(cpuInfo);
        }).catch(error => console.error(error));
    });

    ipcMain.on('cpu-temp-info', e => {
        // CPU information
        si.cpuTemperature().then(cpuTemperature=>{
        const cpuTemp=[];
        cpuTemp.push(cpuTemperature.main,cpuTemperature.max);
        //console.log(cpu['manufacturer']);
        //cpuInfo.push(cpu['brand']);
        //cpuInfo.push(cpu['cores']);
        e.sender.send('cpu-temp-info',cpuTemp);
        //console.log(cpuInfo);
        }).catch(error => console.error(error));
    });

    ipcMain.on('com', e => {

        // PC information
        let Uptime = os.uptime()/60;
        let FreeMemory = os.freemem()/1073741824;
        let OsType = os.type()

        const com=[];
        com.push(Uptime, FreeMemory, OsType)

        e.sender.send('com',com);

    });

    ipcMain.on('memory', e => {
        // CPU information
        si.mem().then(mem=>{
        const memory=[];
        total = mem.total/1073741824
        memory.push(total);
        //osInfo
        e.sender.send('memory',memory);
        //console.log(cpuInfo);
        }).catch(error => console.error(error));
    });
}

module.exports=sysMon;
