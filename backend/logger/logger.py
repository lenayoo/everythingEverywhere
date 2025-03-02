import logging
import sys

LOGGER_FILE_NAME = "python-react.log"

# 🔥 stdout 버퍼링 해제
sys.stdout.reconfigure(encoding="utf-8")

# 🔥 기본 로깅 설정
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)-8s : [%(module)s] - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),  # stdout으로 출력하여 Docker에서 확인 가능
        logging.FileHandler(LOGGER_FILE_NAME, encoding="utf-8"),  # 파일에도 저장
    ],
)

logger = logging.getLogger("backend_logger")

logger.info("🌸 Logger initialized successfully!")
