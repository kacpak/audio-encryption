# Audio Encryption Tool [![Build Status](https://travis-ci.org/kacpak/audio-encryption.svg?branch=master)](https://travis-ci.org/kacpak/audio-encryption)

Program do szyfrowania dźwięku oferuje
* nagrywanie i zwrot dźwięku w postaci zaszyfrowanego tekstu,  
* deszyfrowanie tekstu do oryginalnego dźwięku i odtworzenie go

## Wymagane narzędzia
* Node ^7.6.0
* Yarn

## Instalacja
* **yarn install** By zainstalować zależności projektu
* **npm start** By uruchomić aplikację w trybie deweloperskim

## Szyfr Vigenère'a
Operuje on na tabeli, w której każdy wiersz to kolejne litery alfabetu, w każdym kolejnym wierszu przesunięte o jedną. Do zaszyfrowania używany jest klucz, który jest powtarzany lub obcinany do długości szyfrogramu. Litery znajdująca się na tym samym miejscu w tekście jawnym i kluczu wyznaczają wiersz i kolumnę, z których przecięcia wybierana jest litera do tekstu zaszyfrowanego.
Odszyfrowywanie wykonywane jest na podobnej zasadzie. Litera tekstu jawnego odpowiada literze na przecięciu kolumny i wiersza odpowiadających odpowiednio literom na tej samej pozycji w szyfrogramie i kluczu.
