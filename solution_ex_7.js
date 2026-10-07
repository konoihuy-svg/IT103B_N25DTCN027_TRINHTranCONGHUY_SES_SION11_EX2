const validateDevice = (device) => {
  if (!device.name || device.name.trim() === "") return false;
  if (!device.room || device.room.trim() === "") return false;
  if (device.powerWatts === undefined || device.powerWatts <= 0) return false;
  return true;
};

const generateId = () => {
  return 'DEV_' + Math.floor(Math.random() * 1000000);
};

const createDevice = (list, newDev) => {
  if (!validateDevice(newDev)) return false;
  
  const deviceToAdd = {
    id: generateId(),
    name: newDev.name,
    room: newDev.room,
    powerWatts: newDev.powerWatts,
    isActive: newDev.isActive !== undefined ? newDev.isActive : false
  };
  
  list.push(deviceToAdd);
  return true;
};

const readDevicesByRoom = (list, roomName) => {
  const result = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].room === roomName) {
      result.push(list[i]);
    }
  }
  return result;
};

const updateDevice = (list, id, updatedData) => {
  let targetIndex = -1;
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      targetIndex = i;
      break;
    }
  }
  
  if (targetIndex === -1) return false;

  const targetDevice = list[targetIndex];

  if (updatedData.name !== undefined) targetDevice.name = updatedData.name;
  if (updatedData.room !== undefined) targetDevice.room = updatedData.room;
  if (updatedData.isActive !== undefined) targetDevice.isActive = updatedData.isActive;
  if (updatedData.powerWatts !== undefined) targetDevice.powerWatts = updatedData.powerWatts;

  return true;
};

const deleteDevice = (list, id) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1);
      return true;
    }
  }
  return false;
};

const mySmartHome = [];

createDevice(mySmartHome, { name: "Điều hòa", room: "Phòng Khách", powerWatts: 2000, isActive: true });
createDevice(mySmartHome, { name: "Tivi OLED", room: "Phòng Khách", powerWatts: 150, isActive: false });
createDevice(mySmartHome, { name: "Đèn ngủ", room: "Phòng Ngủ", powerWatts: 15, isActive: true });

console.log("--- TẤT CẢ THIẾT BỊ SAU KHI THÊM MỚI ---");
console.table(mySmartHome);

console.log("\n--- LỌC THIẾT BỊ THEO PHÒNG KHÁCH ---");
const livingRoomDevices = readDevicesByRoom(mySmartHome, "Phòng Khách");
console.table(livingRoomDevices);

if (mySmartHome.length > 0) {
  const firstDeviceId = mySmartHome[0].id;
  updateDevice(mySmartHome, firstDeviceId, { isActive: false, powerWatts: 0 });
  
  if (mySmartHome.length > 1) {
    deleteDevice(mySmartHome, mySmartHome[1].id);
  }
}

console.log("\n--- DANH SÁCH SAU KHI CẬP NHẬT VÀ XÓA ---");
console.table(mySmartHome);
