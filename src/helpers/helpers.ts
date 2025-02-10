// currencyHelper.js

import dayjs from "dayjs";

// Sayıyı Türk Lirası formatına çeviren fonksiyon
export const formatToTL = (value) => {
  if (value === null || value === undefined || value === "") {
    return "";
  }
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  }).format(value);
};

// Kullanıcının sayısal girişi işleyen fonksiyon
export const handleNightlyRateChange = (
  e,
  setNightlyRate,
  setFormattedNightlyRate
) => {
  const rawValue = e?.target?.value?.replace(/[^\d.]/g, ""); // Sadece sayıları al
  setNightlyRate(rawValue);
  setFormattedNightlyRate(rawValue); // Input üzerinde formatlanmamış hali göster
};

// Input dışına çıkıldığında TL formatında gösterim sağlayan fonksiyon
export const handleNightlyRateBlur = (nightlyRate, setFormattedNightlyRate) => {
  if (nightlyRate) {
    setFormattedNightlyRate(formatToTL(nightlyRate)); // Input dışına çıkıldığında formatla
  }
};

// Input'a tıklandığında ham değeri geri gösteren fonksiyon
export const handleNightlyRateFocus = (
  nightlyRate,
  setFormattedNightlyRate
) => {
  setFormattedNightlyRate(nightlyRate); // Ham değeri geri koy
};

// dateHelper.js

/**
 * Tarihi Türk formatında (dd.MM.yyyy) formatlar.
 * @param {string|Date} date - Formatlanacak tarih (Date objesi veya string).
 * @returns {string} - Formatlanmış tarih (dd.MM.yyyy).
 */
export const formatDateToTR = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};

// // Check-in ve Check-out tarihleri arasındaki gün farkını hesaplama
export const getStayDuration = (_checkInDate, _checkOutDate) => {
  if (_checkInDate && _checkOutDate) {
    const checkInDate = dayjs(_checkInDate).startOf("day"); // Günü başlangıç olarak alıyoruz
    const checkOutDate = dayjs(_checkOutDate).startOf("day"); // Günü başlangıç olarak alıyoruz
    const diffInDays = checkOutDate.diff(checkInDate, "day"); // Gün farkı
    return diffInDays;
  }
  return null;
};
