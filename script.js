let blurTimeout;
let drawing = false;
let leftClickCount = 0;
let rightClickCount = 0;
let zKeyCount = 0;
let xKeyCount = 0;

document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('mouseover', () => {
        clearTimeout(blurTimeout);
        document.querySelector('.bg-pic img').style.filter = 'brightness(0.75) blur(5px)';
    });
    button.addEventListener('mouseout', () => {
        blurTimeout = setTimeout(() => {
            document.querySelector('.bg-pic img').style.filter = 'brightness(0.75)';
        }, 300); // 延迟300毫秒恢复清晰
    });
    button.addEventListener('click', () => {
        window.location.href = button.getAttribute('data-url');
    });
});

const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX - 55}px`; // 调整光标位置到正中心
    cursor.style.top = `${e.pageY - 55}px`;  // 调整光标位置到正中心

    if (drawing) {
        const trail = document.createElement('div');
        trail.style.position = 'absolute';
        trail.style.left = `${e.pageX - 22}px`; // 调整轨迹点位置
        trail.style.top = `${e.pageY - 22}px`;  // 调整轨迹点位置
        trail.style.width = '44px'; // 轨迹点大小为光标大小的80%
        trail.style.height = '44px'; // 轨迹点大小为光标大小的80%
        trail.style.backgroundColor = 'white';
        trail.style.borderRadius = '50%'; // 使轨迹点为圆形
        trail.style.pointerEvents = 'none';
        trail.style.opacity = '1';
        trail.style.filter = 'blur(2px)'; // 增加轻微的模糊效果
        document.body.appendChild(trail);

        setTimeout(() => {
            trail.style.transition = 'opacity 3s';
            trail.style.opacity = '0';
            setTimeout(() => {
                trail.remove();
            }, 3000);
        }, 0);
    }
});

function triggerClickEffect(e) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = `${e.pageX - 25}px`;
    ripple.style.top = `${e.pageY - 25}px`;
    ripple.style.width = '50px';
    ripple.style.height = '50px';
    document.body.appendChild(ripple);

    cursor.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cursor.style.transform = 'scale(1)';
    }, 100);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function updateCounter(id, count) {
    const counter = document.getElementById(id);
    counter.textContent = `${id.split('-')[0].toUpperCase()}: ${count}`;
    counter.classList.add('counting');
    setTimeout(() => {
        counter.classList.remove('counting');
    }, 100);
}

document.addEventListener('click', (e) => {
    triggerClickEffect(e);
    leftClickCount++;
    updateCounter('left-click-counter', leftClickCount);
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    triggerClickEffect(e);
    rightClickCount++;
    updateCounter('right-click-counter', rightClickCount);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'c') {
        drawing = true;
    }
    if (e.key === 'z') {
        zKeyCount++;
        updateCounter('z-key-counter', zKeyCount);
        triggerClickEffect({ pageX: cursor.offsetLeft + 55, pageY: cursor.offsetTop + 55 });
    } else if (e.key === 'x') {
        xKeyCount++;
        updateCounter('x-key-counter', xKeyCount);
        triggerClickEffect({ pageX: cursor.offsetLeft + 55, pageY: cursor.offsetTop + 55 });
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'c') {
        drawing = false;
    }
});

// 忽略选择操作
document.addEventListener('selectstart', (e) => {
    e.preventDefault();
});