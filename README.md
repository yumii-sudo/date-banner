# date-banner

스마트스토어 상세페이지용 날짜 자동 변경 배너.

- `banner.html` : 배너 원본 (열리는 시점의 날짜로 계산)
- `card.png` : 고정 영역(쿠폰 카드) 이미지
- `generate.js` : banner.html 을 캡처해 `event-banner.png` 생성
- `.github/workflows/daily.yml` : 매일 한국시간 00:05 자동 실행

이미지 주소: https://yumii-sudo.github.io/date-banner/event-banner.png
