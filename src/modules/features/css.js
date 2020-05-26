const vh = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
window.addEventListener('resize', vh);
vh();

const s = document.head.appendChild(document.createElement("style"));
s.setAttribute("class", "Flex");
s.innerText = `
    .Flex {display: flex; width: 100%; overflow: hidden}
    .Flex.Box {flex-direction: column; flex-grow: 1}
    .Flex.Screen {position: fixed; touch-action: none; overflow: hidden; height: 100vh; height: calc(var(--vh, 1vh) * 100)}
    .Flex.Bottom {justify-content: flex-end}
    .Flex.Top {justify-content: flex-start}
    .Flex.Middle {justify-content: center}
    .Flex.Left {align-items: flex-start}
    .Flex.Right {align-items: flex-end}
    .Flex.Center {align-items: center; text-align: center}
`;

