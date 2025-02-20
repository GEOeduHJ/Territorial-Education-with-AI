import React, { useState } from 'react'; // React와 useState 훅을 가져옵니다.
import './App.css'; // CSS 파일을 가져옵니다.

function App() {
  // 상태 변수를 설정합니다.
  const [activeTab, setActiveTab] = useState('프롬프트 작성'); // 현재 활성화된 탭
  const [promptInputs, setPromptInputs] = useState({ 
    case: '', 
    conflict: '', 
    background: '', 
    solution: '' 
  }); // 사용자 입력값을 저장하는 상태 변수
  const [generatedText, setGeneratedText] = useState(''); // 생성된 문장을 저장하는 상태 변수
  const [songPrompt, setSongPrompt] = useState(''); // 2단계 노래 프롬프트 저장
  const [referenceSong, setReferenceSong] = useState(''); // 참고할 노래 입력 상태
  const [selectedRhythm, setSelectedRhythm] = useState('60'); // 선택한 박자 상태
  const [selectedScale, setSelectedScale] = useState('C'); // 선택한 스케일 상태
  const [selectedGenre, setSelectedGenre] = useState('POP'); // 선택한 장르 상태

  // 사용자 입력 값 업데이트 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromptInputs({ ...promptInputs, [name]: value }); // 입력값을 상태에 저장
  };

  // 프롬프트 문자열 생성 함수
  const generatePromptString = () => {
    const promptString = `[${promptInputs.case}] 영토 분쟁을 사례로 캠페인 노래를 만들거야. 이 사례는 [${promptInputs.conflict}]이/가 갈등을 겪고 있고, [${promptInputs.background}]이/가 핵심적인 분쟁 배경이야. 해결 방안으로는 [${promptInputs.solution}]이/가 필요해.`;
    setGeneratedText(promptString); // 생성된 문장을 상태에 저장
    navigator.clipboard.writeText(promptString); // 클립보드에 복사
  };

  // 2단계 노래 프롬프트 생성 함수
  const generateSongPrompt = () => {
    const promptString = `이 노래는 영토 분쟁을 해결에 도움을 주기 위한 캠페인 송이야. 박자는 [${selectedRhythm}]으로 하고, 스케일은 [${selectedScale}] 스케일로 해줘. 장르는 [${selectedGenre}]이고, 참고할 노래는 [${referenceSong}]이야. 이 노래와 비슷한 느낌이 나도록 만들어줘.`;
    setSongPrompt(promptString); // 생성된 노래 프롬프트를 상태에 저장
  };

  return (
    <div className="app-container">
      <h1>영토 교육 캠페인 앨범 제작</h1>

      {/* 탭 버튼들 */}
      <div className="tabs">
        <button onClick={() => setActiveTab('프롬프트 작성')}>준비 단계: 프롬프트 작성</button>
        <button onClick={() => setActiveTab('가사 만들기')}>1단계: 가사 만들기</button>
        <button onClick={() => setActiveTab('노래 만들기')}>2단계: 노래 만들기</button>
        <button onClick={() => setActiveTab('앨범 커버 만들기')}>3단계: 앨범 커버 만들기</button>
        <button onClick={() => setActiveTab('뮤직비디오 만들기')}>4단계: 뮤직비디오 만들기</button>
        <button onClick={() => setActiveTab('앨범 제작하기')}>마무리 단계: 앨범 제작하기</button>
      </div>

      {/* 탭 내용 */}
      {activeTab === '프롬프트 작성' && (
        <div className="prompt-section">
          <h2>프롬프트 작성</h2>
          <p>이 단계에서는 AI에게 명령할 프롬프트를 작성합니다.</p>
          <p>학습내용을 바탕으로 아래 박스를 채우고, 출력하기 버튼을 눌러주세요.</p>
          <h3>예시</h3>
          <p>갈등 사례: 독도 영유권  /  갈등 국가명: 한국과 일본</p>
          <p>핵심 분쟁 배경: 역사적, 국제법적 대립</p>
          <p>해결 방안: 올바른 역사 교육, 국제법에 따른 절차 준수</p>
          <h3>프롬프트</h3>
          <p>[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ] 영토 분쟁을 사례로 캠페인 노래를 만들거야. 이 사례는 [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]이/가 갈등을 겪고 있고,</p> 
          <p>[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]이/가 핵심적인 분쟁 배경이야. 해결 방안으로는 [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]이/가 필요해.</p>
          
          <input
            type="text"
            name="case"
            placeholder="갈등 사례를 입력하세요"
            value={promptInputs.case}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="conflict"
            placeholder="갈등 국가명을 입력하세요"
            value={promptInputs.conflict}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="background"
            placeholder="핵심 분쟁 배경을 입력하세요"
            value={promptInputs.background}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="solution"
            placeholder="해결 방안을 입력하세요"
            value={promptInputs.solution}
            onChange={handleInputChange}
          />
          <button onClick={generatePromptString}>출력하기</button> {/* 생성 버튼 */}
          <textarea
            readOnly
            value={generatedText}
            rows="8"
            className="generated-text"
            placeholder="생성된 문장이 여기에 나타납니다..."
          />
        </div>
      )}

      {activeTab === '가사 만들기' && (
        <div className="step-container">
          <h2>1단계: 가사 만들기</h2>
          <p>아래 프롬프트를 이용해 텍스트 생성형 AI와 함께 가사를 만들어보세요!</p>
          <textarea
            readOnly
            value={`${generatedText}\n\n위 프롬프트를 바탕으로 영토 분쟁쟁 캠페인 송 가사를 작성해줘.\n조건은 다음과 같아. \n1. 분량은 30초, 벌스 1개, 코러스 1개로 만들면 돼. \n2. 각 파트는 총 4줄로 구성하고, 각 줄은 최대 4어절이야. \n3. 가사에 갈등 국가, 분쟁 배경, 해결 방안이 반드시 들어가도록 해줘.`}
            rows="12"
            className="generated-text"
            placeholder="생성된 가사가 여기에 나타납니다..."
          />
          <a href="https://gemini.google.com/app?hl=ko" target="_blank" rel="noopener noreferrer" className="link-box">
            가사 만들기 페이지로 이동
          </a>
        </div>
      )}

      {activeTab === '노래 만들기' && (
        <div className="step-container">
          <h2>2단계: 노래 만들기</h2>
          <p>1단계에서 만든 가사를 이용하여 노래를 만들어보세요!</p>
          <p>아래 프롬프트를 이용해 오디오 생성형 AI와 함께 캠페인 송을 제작해봅시다!</p>

          <div className="select-group">
            <label>
              박자: 
              <select onChange={(e) => setSelectedRhythm(e.target.value)}>
                <option value="60">60</option>
                <option value="100">100</option>
                <option value="150">150</option>
              </select>
            </label>
          </div>

          <div className="select-group">
            <label>
              스케일: 
              <select onChange={(e) => setSelectedScale(e.target.value)}>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </label>
          </div>

          <div className="select-group">
            <label>
              장르: 
              <select onChange={(e) => setSelectedGenre(e.target.value)}>
                <option value="POP">POP</option>
                <option value="HIP-HOP">HIP-HOP</option>
                <option value="ROCK">ROCK</option>
                <option value="FUNK">FUNK</option>
                <option value="R&B">R&B</option>
                <option value="K-POP">K-POP</option>
              </select>
            </label>
          </div>

          <input
            type="text"
            placeholder="참고할 노래를 입력하세요"
            value={referenceSong}
            onChange={(e) => setReferenceSong(e.target.value)}
          />
          <button onClick={generateSongPrompt}>출력하기</button> {/* 노래 프롬프트 생성 */}
          <textarea
            readOnly
            value={songPrompt}
            rows="8"
            className="generated-text"
            placeholder="생성된 노래 프롬프트가 여기에 나타납니다..."
          />
          <a href="https://www.udio.com/" target="_blank" rel="noopener noreferrer" className="link-box">
            노래 만들기 페이지로 이동
          </a>
          <p> </p>
          <a href="https://drive.google.com/file/d/1ofUdfHFj1zemiI1dmIgrh0aGmH4tQk7j/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="link-box">
            !노래 만들기 가이드!
          </a>
        </div>
      )}

      {activeTab === '앨범 커버 만들기' && (
        <div className="step-container">
          <h2>3단계: 앨범 커버 만들기</h2>
          <p>아래 프롬프트를 이용해 이미지 생성형 AI와 함께 캠페인 앨범 표지를 제작해봅시다!</p>
          <p>구체적인 이미지 구상을 아래 프롬프트에 추가로 넣어주세요</p>
          <textarea
            readOnly
            value={`${generatedText}\n\n위 사례를 바탕으로 영토 분쟁을 다루는 노래의 앨범 표지를 만들고 싶어. \n\n[...여기에 내용을 추가하세요...]`}
            rows="8"
            className="generated-text"
            placeholder="생성된 앨범 커버 프롬프트가 여기에 나타납니다..."
          />
          <a href="https://wrtn.ai/" target="_blank" rel="noopener noreferrer" className="link-box">
            앨범 커버 만들기 페이지로 이동
          </a>
        </div>
      )}

      {activeTab === '뮤직비디오 만들기' && (
        <div className="step-container">
          <h2>4단계: 뮤직비디오 만들기</h2>
          <p>아래 프롬프트를 이용해 영상 생성형 AI와 함께 캠페인 뮤직비디오에 들어갈 영상을 제작해봅시다!</p>
          <textarea
            readOnly
            value={`${generatedText}\n\n이 영상은 위 영토 분쟁을 사례로 해서 분쟁 해결에 도움을 줄 수 있는 캠페인의 뮤직비디오야.\n참고 이미지를 바탕으로 [...내용을 추가해주세요...] 영상을 제작해줘.`}
            rows="8"
            className="generated-text"
            placeholder="생성된 뮤직비디오 프롬프트가 여기에 나타납니다..."
          />
          <a href="https://hailuoai.video/create" target="_blank" rel="noopener noreferrer" className="link-box">
            뮤직비디오 만들기 페이지로 이동
          </a>
        </div>
      )}

      {activeTab === '앨범 제작하기' && (
        <div className="final-step-container">
          <h2>마무리 단계: 앨범 제작하기</h2>
          <a href="https://www.capcut.com/my-edit?start_tab=video" target="_blank" rel="noopener noreferrer" className="link-box">
            앨범 제작하기
          </a>
          <a href="https://padlet.com/ghdwns00610/_-f575dgwgyfccfr0v" target="_blank" rel="noopener noreferrer" className="link-box">
            앨범 업로드하기
          </a>
        </div>
      )}

      {/* 페들릿 사이트를 불러올 iframe */}
      <h2>최종 앨범 결과물</h2>
      <iframe 
        title="최종 앨범 결과물" 
        src="https://padlet.com/ghdwns00610/_-f575dgwgyfccfr0v" // 페들릿 사이트의 주소
        width="100%"
        height="800px"
        className="iframe"
      />
    </div>
  );
}

export default App; // App 컴포넌트를 내보냅니다.