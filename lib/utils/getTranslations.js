import normalizeLanguage from './normalizeLanguage.js';

// One entry per language, so adding a language cannot leave one of the five strings
// behind — which is what a set of parallel switch statements made easy to do.
const TRANSLATIONS = {
  ara: {
    placeholder: 'أدخل رقم الهاتف',
    inputLabel: 'حقل إدخال رقم الهاتف',
    inputHint: 'اكتب رقم الهاتف',
    countriesButtonLabel: 'زر البلدان',
    countriesButtonHint: 'انقر لفتح نافذة البلدان',
  },
  bel: {
    placeholder: 'Увядзіце свой нумар тэлефона',
    inputLabel: 'Поле для ўводу нумара тэлефона',
    inputHint: 'Увядзіце нумар тэлефона',
    countriesButtonLabel: 'Кнопка выбару краіны',
    countriesButtonHint: 'Націсніце, каб адкрыць акно з краінамі',
  },
  bre: {
    placeholder: 'Roit ho niver pellgomz',
    inputLabel: 'Maezienn niver pellgomz',
    inputHint: 'Skrivit an niver pellgomz',
    countriesButtonLabel: 'Nozelen broioù',
    countriesButtonHint: 'Klikit evit digeriñ ar prenestr broioù',
  },
  bul: {
    placeholder: 'Въведете телефонния си номер',
    inputLabel: 'Поле за телефонен номер',
    inputHint: 'Напишете телефонен номер',
    countriesButtonLabel: 'Бутон държави',
    countriesButtonHint: 'Щракнете, за да отворите прозореца с държави',
  },
  ces: {
    placeholder: 'Vložte své telefonní číslo',
    inputLabel: 'Pole pro telefonní číslo',
    inputHint: 'Napište telefonní číslo',
    countriesButtonLabel: 'Tlačítko zemí',
    countriesButtonHint: 'Klikněte pro otevření okna se zeměmi',
  },
  deu: {
    placeholder: 'Geben Sie Ihre Rufnummer ein',
    inputLabel: 'Telefonnummer-Eingabefeld',
    inputHint: 'Schreiben Sie die Telefonnummer',
    countriesButtonLabel: 'Länder-Button',
    countriesButtonHint: 'Klicken Sie, um das Länder-Modal zu öffnen',
  },
  ell: {
    placeholder: 'Εισάγετε τον αριθμό τηλεφώνου σας',
    inputLabel: 'Πεδίο εισαγωγής αριθμού τηλεφώνου',
    inputHint: 'Γράψτε τον αριθμό τηλεφώνου',
    countriesButtonLabel: 'Κουμπί χωρών',
    countriesButtonHint: 'Κάντε κλικ για να ανοίξετε το παράθυρο χωρών',
  },
  eng: {
    placeholder: 'Insert your phone number',
    inputLabel: 'Phone Number input',
    inputHint: 'Write the phone number',
    countriesButtonLabel: 'Countries button',
    countriesButtonHint: 'Click to open the countries modal',
  },
  est: {
    placeholder: 'Sisestage oma telefoninumber',
    inputLabel: 'Telefoninumbri sisestusväli',
    inputHint: 'Kirjutage telefoninumber',
    countriesButtonLabel: 'Riikide nupp',
    countriesButtonHint: 'Klõpsake riikide akna avamiseks',
  },
  fin: {
    placeholder: 'Syötä puhelinnumerosi',
    inputLabel: 'Puhelinnumeron syöttökenttä',
    inputHint: 'Kirjoita puhelinnumero',
    countriesButtonLabel: 'Maat-painike',
    countriesButtonHint: 'Napsauta avataksesi maat-ikkunan',
  },
  fra: {
    placeholder: 'Insérez votre numéro de téléphone',
    inputLabel: 'Champ numéro de téléphone',
    inputHint: 'Écrivez le numéro de téléphone',
    countriesButtonLabel: 'Bouton pays',
    countriesButtonHint: 'Cliquez pour ouvrir la fenêtre des pays',
  },
  heb: {
    placeholder: 'הכנס את מספר הטלפון שלך',
    inputLabel: 'שדה קלט מספר טלפון',
    inputHint: 'כתוב את מספר הטלפון',
    countriesButtonLabel: 'כפתור מדינות',
    countriesButtonHint: 'לחץ כדי לפתוח את חלון המדינות',
  },
  hrv: {
    placeholder: 'Unesite svoj broj telefona',
    inputLabel: 'Polje za unos broja telefona',
    inputHint: 'Upišite broj telefona',
    countriesButtonLabel: 'Gumb zemlje',
    countriesButtonHint: 'Kliknite za otvaranje prozora zemalja',
  },
  hun: {
    placeholder: 'Adja meg a telefonszámát',
    inputLabel: 'Telefonszám mező',
    inputHint: 'Írja be a telefonszámot',
    countriesButtonLabel: 'Országok gomb',
    countriesButtonHint: 'Kattintson az országok ablak megnyitásához',
  },
  ita: {
    placeholder: 'Inserire il numero di telefono',
    inputLabel: 'Campo numero di telefono',
    inputHint: 'Scrivi il numero di telefono',
    countriesButtonLabel: 'Pulsante paesi',
    countriesButtonHint: 'Clicca per aprire la finestra dei paesi',
  },
  jpn: {
    placeholder: '電話番号を入力してください',
    inputLabel: '電話番号入力欄',
    inputHint: '電話番号を入力してください',
    countriesButtonLabel: '国ボタン',
    countriesButtonHint: '国一覧のモーダルを開くにはクリック',
  },
  kor: {
    placeholder: '전화번호를 입력하세요',
    inputLabel: '전화번호 입력란',
    inputHint: '전화번호를 입력하세요',
    countriesButtonLabel: '국가 버튼',
    countriesButtonHint: '국가 모달을 열려면 클릭하세요',
  },
  nld: {
    placeholder: 'Voer uw telefoonnummer in',
    inputLabel: 'Telefoonnummer veld',
    inputHint: 'Schrijf het telefoonnummer',
    countriesButtonLabel: 'Landenknop',
    countriesButtonHint: 'Klik om het landenvenster te openen',
  },
  per: {
    placeholder: 'شماره تلفن خود را وارد کنید',
    inputLabel: 'فیلد ورود شماره تلفن',
    inputHint: 'شماره تلفن را وارد کنید',
    countriesButtonLabel: 'دکمه کشورها',
    countriesButtonHint: 'برای باز کردن پنجره کشورها کلیک کنید',
  },
  pol: {
    placeholder: 'Wprowadź swój numer telefonu',
    inputLabel: 'Pole numeru telefonu',
    inputHint: 'Wpisz numer telefonu',
    countriesButtonLabel: 'Przycisk krajów',
    countriesButtonHint: 'Kliknij, aby otworzyć okno krajów',
  },
  por: {
    placeholder: 'Insira seu número de telefone',
    inputLabel: 'Campo do número de telefone',
    inputHint: 'Digite o número de telefone',
    countriesButtonLabel: 'Botão de países',
    countriesButtonHint: 'Clique para abrir o modal de países',
  },
  ron: {
    placeholder: 'Introduceți numărul dvs. de telefon',
    inputLabel: 'Câmp număr de telefon',
    inputHint: 'Scrieți numărul de telefon',
    countriesButtonLabel: 'Buton țări',
    countriesButtonHint: 'Faceți clic pentru a deschide fereastra țărilor',
  },
  rus: {
    placeholder: 'Вставьте свой номер телефона',
    inputLabel: 'Поле для ввода номера телефона',
    inputHint: 'Введите номер телефона',
    countriesButtonLabel: 'Кнопка выбора страны',
    countriesButtonHint: 'Нажмите, чтобы открыть окно выбора страны',
  },
  slk: {
    placeholder: 'Zadajte svoje telefónne číslo',
    inputLabel: 'Pole telefónneho čísla',
    inputHint: 'Napíšte telefónne číslo',
    countriesButtonLabel: 'Tlačidlo krajín',
    countriesButtonHint: 'Kliknutím otvoríte okno krajín',
  },
  spa: {
    placeholder: 'Introduzca su número de teléfono',
    inputLabel: 'Campo del número de teléfono',
    inputHint: 'Escriba el número de teléfono',
    countriesButtonLabel: 'Botón de países',
    countriesButtonHint: 'Haga clic para abrir el modal de países',
  },
  srp: {
    placeholder: 'Унесите свој број телефона',
    inputLabel: 'Поље за број телефона',
    inputHint: 'Упишите број телефона',
    countriesButtonLabel: 'Дугме за земље',
    countriesButtonHint: 'Кликните да отворите прозор са земљама',
  },
  swe: {
    placeholder: 'Ange ditt telefonnummer',
    inputLabel: 'Telefonnummerfält',
    inputHint: 'Skriv telefonnumret',
    countriesButtonLabel: 'Länderknapp',
    countriesButtonHint: 'Klicka för att öppna landsfönstret',
  },
  tur: {
    placeholder: 'Telefon numarası girin',
    inputLabel: 'Telefon numarası girişi',
    inputHint: 'Telefon numarasını yazın',
    countriesButtonLabel: 'Ülkeler butonu',
    countriesButtonHint: 'Ülkeler penceresini açmak için tıklayın',
  },
  ukr: {
    placeholder: 'Введіть свій номер телефону',
    inputLabel: 'Поле номера телефону',
    inputHint: 'Введіть номер телефону',
    countriesButtonLabel: 'Кнопка країн',
    countriesButtonHint: 'Натисніть, щоб відкрити вікно країн',
  },
  urd: {
    placeholder: 'اپنا فون نمبر درج کریں',
    inputLabel: 'فون نمبر ان پٹ',
    inputHint: 'فون نمبر لکھیں',
    countriesButtonLabel: 'ممالک کا بٹن',
    countriesButtonHint: 'ممالک کی ونڈو کھولنے کے لیے کلک کریں',
  },
  zho: {
    placeholder: '输入电话号码',
    inputLabel: '电话号码输入框',
    inputHint: '输入电话号码',
    countriesButtonLabel: '国家按钮',
    countriesButtonHint: '点击打开国家选择窗口',
  },
  'zho-Hans': {
    placeholder: '输入电话号码',
    inputLabel: '电话号码输入框',
    inputHint: '输入电话号码',
    countriesButtonLabel: '国家按钮',
    countriesButtonHint: '点击打开国家选择窗口',
  },
  'zho-Hant': {
    placeholder: '輸入電話號碼',
    inputLabel: '電話號碼輸入欄位',
    inputHint: '輸入電話號碼',
    countriesButtonLabel: '國家按鈕',
    countriesButtonHint: '點擊開啟國家選擇視窗',
  },
};

const FALLBACK_LANGUAGE = 'eng';

// An unknown or missing code falls back to English: an untranslated label still beats
// `undefined`, which left the input with no placeholder and no accessibility label.
function translate(language, key) {
  const entry =
    TRANSLATIONS[normalizeLanguage(language)] || TRANSLATIONS[FALLBACK_LANGUAGE];

  return entry[key];
}

export function getPhoneNumberInputPlaceholder(language) {
  return translate(language, 'placeholder');
}

export function getPhoneNumberInputAccessibilityLabel(language) {
  return translate(language, 'inputLabel');
}

export function getPhoneNumberInputAccessibilityHint(language) {
  return translate(language, 'inputHint');
}

export function getCountriesButtonAccessibilityLabel(language) {
  return translate(language, 'countriesButtonLabel');
}

export function getCountriesButtonAccessibilityHint(language) {
  return translate(language, 'countriesButtonHint');
}
