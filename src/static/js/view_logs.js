const logTextArea = document.getElementById("logTextArea");

// 建立 WebSocket 连接
const socket = new WebSocket(`ws://${window.location.host}/ws`);

// 处理 WebSocket 消息
socket.onmessage = function (event) {
    const logData = event.data;

    if (logData) {
        logTextArea.value = logData + '\n';
        // 滚动到文本区域底部
        logTextArea.scrollTop = logTextArea.scrollHeight;
    }
};

// 刷新日志函数
async function refreshLog() {
    try {
        const response = await fetch("/api/view_logs");
        const logData = await response.json(); // 假设响应是 JSON 格式

        if (logData && logData.log_content) {
            logTextArea.value = logData.log_content;

            // 滚动到文本区域底部
            logTextArea.scrollTop = logTextArea.scrollHeight;
        } else {
            logTextArea.value = "Log content not found in the response.";
        }
    } catch (error) {
        console.error("Error fetching log:", error);
        logTextArea.value = "Error fetching log.";
    }
}

// 初次加载页面时刷新日志并滚动到底部
// window.addEventListener("load", () => {
//     refreshLog();
// });

// 刷新按钮点击时刷新日志
document.getElementById("refreshButton").addEventListener("click", () => {
    refreshLog();
});