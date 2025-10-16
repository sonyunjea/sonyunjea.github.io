document.addEventListener('DOMContentLoaded', () => {
// 이 페이지에 탭 버튼이 있을 때만 스크립트를 실행합니다.
if (document.querySelector('.tab-button')) {
const tabButtons = document.querySelectorAll('.tab-button');
const tabContentContainer = document.getElementById('tab-content');

    const tabContents = {
        deviance: `
            <div class="space-y-6">
                <div>
                    <h4 class="text-lg font-semibold text-emerald-700">기능론적 관점</h4>
                    <p class="ml-4 pl-4 border-l-2 border-slate-200">사회의 정상적인 작동을 위해 일탈이 발생하며, 특정 일탈은 사회 통합에 기여하기도 한다고 봅니다.</p>
                    <ul class="ml-8 mt-2 space-y-1 list-disc list-inside text-slate-700">
                        <li><strong>뒤르켐의 아노미 이론:</strong> 급격한 사회 변동으로 인한 무규범 상태(아노미)가 일탈의 원인.</li>
                        <li><strong>머튼의 아노미 이론:</strong> 문화적 목표와 제도적 수단 간의 괴리가 일탈의 원인.</li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold text-emerald-700">갈등론적 관점</h4>
                    <p class="ml-4 pl-4 border-l-2 border-slate-200">지배 집단이 자신들에게 유리한 규범을 만들고, 이를 위반하는 피지배 집단의 행위를 일탈로 규정한다고 봅니다.</p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold text-emerald-700">상징적 상호작용론적 관점</h4>
                    <p class="ml-4 pl-4 border-l-2 border-slate-200">개인 간의 상호작용 과정에서 일탈이 학습되거나 규정된다고 봅니다.</p>
                     <ul class="ml-8 mt-2 space-y-1 list-disc list-inside text-slate-700">
                        <li><strong>차별 교제 이론:</strong> 일탈자와의 상호작용을 통해 일탈 행동을 학습.</li>
                        <li><strong>낙인 이론:</strong> 사회적으로 '일탈자'라는 낙인이 찍히는 과정에 주목. 1차적 일탈보다 2차적 일탈을 중요시.</li>
                    </ul>
                </div>
            </div>
        `,
        perspectives: `
            <div class="space-y-6">
                <div>
                    <h4 class="text-lg font-semibold text-emerald-700">기능론 (거시적 관점)</h4>
                    <p class="ml-4 pl-4 border-l-2 border-slate-200">사회를 유기체에 비유하며, 각 사회 제도가 사회 전체의 안정과 통합을 위해 기능한다고 봅니다. 조화와 균형을 강조합니다.</p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold text-emerald-700">갈등론 (거시적 관점)</h4>
                    <p class="ml-4 pl-4 border-l-2 border-slate-200">사회를 희소자원을 둘러싼 집단 간의 갈등과 대립의 장으로 봅니다. 사회 변동을 긍정적으로 평가합니다.</p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold text-emerald-700">상징적 상호작용론 (미시적 관점)</h4>
                    <p class="ml-4 pl-4 border-l-2 border-slate-200">개인의 주관적인 해석과 상황 정의, 그리고 상징을 통한 상호작용에 초점을 맞춥니다. 인간의 능동성을 강조합니다.</p>
                </div>
            </div>
        `
    };

    function switchTab(tabName) {
        if (!tabContentContainer) return;
        tabButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tabName);
        });
        tabContentContainer.innerHTML = tabContents[tabName];
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchTab(button.dataset.tab);
        });
    });

    // 페이지 로드 시 첫 번째 탭을 활성화합니다.
    if(tabButtons.length > 0) {
        switchTab(tabButtons[0].dataset.tab);
    }
}


});
