document.addEventListener('DOMContentLoaded', () => {
// 이 페이지에 차트 캔버스가 있을 때만 스크립트를 실행합니다.
if (document.getElementById('mobilityChart') && document.getElementById('populationChart')) {

    // --- 사회 이동표 차트 로직 ---
    const mobilityData = {
        labels: ['부모: 상', '부모: 중', '부모: 하'],
        datasets: [
            { label: '자녀: 상', data: [15, 5, 2], backgroundColor: 'rgba(52, 211, 153, 0.7)' },
            { label: '자녀: 중', data: [5, 30, 10], backgroundColor: 'rgba(59, 130, 246, 0.7)' },
            { label: '자녀: 하', data: [3, 8, 17], backgroundColor: 'rgba(239, 68, 68, 0.7)' }
        ]
    };
    const mobilityCtx = document.getElementById('mobilityChart').getContext('2d');
    const mobilityChart = new Chart(mobilityCtx, {
        type: 'bar',
        data: mobilityData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true, title: { display: true, text: '인원 (가상 수치)' } }
            },
            plugins: {
                title: { display: true, text: '세대 간 사회 이동 (부모 → 자녀)', font: { size: 16 } },
                tooltip: { mode: 'index' }
            }
        }
    });

    window.updateMobilityChart = (type) => {
        const explanationEl = document.getElementById('mobility-explanation');
        let explanationHTML = '';
        const baseColors = ['rgba(52, 211, 153, 0.7)', 'rgba(59, 130, 246, 0.7)', 'rgba(239, 68, 68, 0.7)'];
        const highlightColor = 'rgba(251, 191, 36, 1)';
        const mutedColor = 'rgba(200, 200, 200, 0.5)';

        mobilityChart.data.datasets.forEach((dataset, i) => {
            dataset.backgroundColor = dataset.data.map((_, j) => {
                if (type === 'all') return baseColors[i];
                if (type === 'inheritance' && i === j) return highlightColor;
                if (type === 'upward' && i < j) return highlightColor;
                if (type === 'downward' && i > j) return highlightColor;
                return mutedColor;
            });
        });
        mobilityChart.update();
        
        switch(type) {
            case 'all':
                explanationHTML = `<h4 class="font-semibold text-lg mb-2">전체 보기</h4><p class="text-slate-700">부모 세대의 계층이 자녀 세대에서 어떻게 분포되는지 전체적으로 보여줍니다. 총 100명의 데이터를 기반으로 분석합니다.</p>`;
                break;
            case 'inheritance':
                explanationHTML = `<h4 class="font-semibold text-lg mb-2">계층 대물림 (15+30+17 = 62명)</h4><p class="text-slate-700">부모와 자녀의 계층이 동일한 경우입니다. (상→상, 중→중, 하→하) 전체의 62%가 계층을 대물림했습니다.</p>`;
                break;
            case 'upward':
                explanationHTML = `<h4 class="font-semibold text-lg mb-2">상승 이동 (5+2+10 = 17명)</h4><p class="text-slate-700">자녀의 계층이 부모보다 높아진 경우입니다. (중→상, 하→상, 하→중) 세대 간 이동이 발생한 38명 중 약 45%가 상승 이동을 경험했습니다.</p>`;
                break;
            case 'downward':
                explanationHTML = `<h4 class="font-semibold text-lg mb-2">하강 이동 (5+3+8 = 16명)</h4><p class="text-slate-700">자녀의 계층이 부모보다 낮아진 경우입니다. (상→중, 상→하, 중→하) 하강 이동 비율은 전체의 16%입니다.</p>`;
                break;
        }
        explanationEl.innerHTML = explanationHTML;
    };
    updateMobilityChart('all');

    // --- 인구 구조 차트 로직 ---
    const populationRawData = [
        { year: 1990, youth: 25, working: 60, elderly: 5 },
        { year: 2020, youth: 15, working: 65, elderly: 20 },
        { year: 2050, youth: 10, working: 50, elderly: 40 },
    ];
    
    const populationData = {
        labels: ['유소년 인구(0-14세)', '부양 인구(15-64세)', '노년 인구(65세 이상)'],
        datasets: [{
            label: '인구 비율 (%)',
            data: [25, 60, 5],
            backgroundColor: ['rgba(59, 130, 246, 0.7)', 'rgba(22, 163, 74, 0.7)', 'rgba(239, 68, 68, 0.7)']
        }]
    };

    const populationCtx = document.getElementById('populationChart').getContext('2d');
    const populationChart = new Chart(populationCtx, {
        type: 'doughnut',
        data: populationData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: '1990년 인구 구조', font: { size: 16 } },
                legend: { position: 'top' }
            }
        }
    });
    
    const populationButtons = document.querySelectorAll('#killer-questions button[onclick^="updatePopulationData"]');
    window.updatePopulationData = (index) => {
        const data = populationRawData[index];
        populationChart.data.datasets[0].data = [data.youth, data.working, data.elderly];
        populationChart.options.plugins.title.text = `${data.year}년 인구 구조` + (data.year === 2050 ? ' (전망)' : '');
        populationChart.update();
        
        const youthRatio = ((data.youth / data.working) * 100).toFixed(1);
        const elderlyRatio = ((data.elderly / data.working) * 100).toFixed(1);
        const totalRatio = (parseFloat(youthRatio) + parseFloat(elderlyRatio)).toFixed(1);

        document.getElementById('population-explanation').querySelector('h4').textContent = `${data.year}년 인구 구조 분석` + (data.year === 2050 ? ' (전망)' : '');
        document.getElementById('youth-ratio').textContent = youthRatio;
        document.getElementById('elderly-ratio').textContent = elderlyRatio;
        document.getElementById('total-ratio').textContent = totalRatio;

        populationButtons.forEach((btn, i) => {
            btn.classList.toggle('bg-emerald-500', i === index);
            btn.classList.toggle('text-white', i === index);
            btn.classList.toggle('bg-slate-200', i !== index);
            btn.classList.toggle('text-slate-800', i !== index);
            btn.classList.toggle('hover:bg-emerald-600', i === index);
            btn.classList.toggle('hover:bg-slate-300', i !== index);
        });
    };
    updatePopulationData(0);
}


});
