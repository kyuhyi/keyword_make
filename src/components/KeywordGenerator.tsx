'use client'

import { useState, useEffect } from 'react'
import { Download, Plus, X, Copy, Check } from 'lucide-react'
import Image from 'next/image'
import GoogleAds from './GoogleAds'

export default function KeywordGenerator() {
  const [mounted, setMounted] = useState(false)
  const [keywords, setKeywords] = useState(['', '', '', ''])
  const [combinations, setCombinations] = useState<string[]>([])
  const [selectedCombinations, setSelectedCombinations] = useState<{[key: string]: boolean}>({})
  const [addSpaces, setAddSpaces] = useState(true)
  const [removeDuplicates, setRemoveDuplicates] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const addKeyword = () => {
    if (keywords.length < 10) {
      setKeywords([...keywords, ''])
    }
  }

  const removeKeyword = (index: number) => {
    if (keywords.length > 2) {
      const newKeywords = keywords.filter((_, i) => i !== index)
      setKeywords(newKeywords)
    }
  }

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...keywords]
    newKeywords[index] = value
    setKeywords(newKeywords)
  }

  const generateCombinations = () => {
    const validKeywords = keywords.filter(k => k.trim() !== '')
    if (validKeywords.length < 2) return

    const combos: string[] = []
    const separator = addSpaces ? ' ' : ''

    // 2개 조합
    for (let i = 0; i < validKeywords.length; i++) {
      for (let j = i + 1; j < validKeywords.length; j++) {
        combos.push(`${validKeywords[i]}${separator}${validKeywords[j]}`)
        combos.push(`${validKeywords[j]}${separator}${validKeywords[i]}`)
      }
    }

    // 3개 조합
    if (validKeywords.length >= 3) {
      for (let i = 0; i < validKeywords.length; i++) {
        for (let j = 0; j < validKeywords.length; j++) {
          for (let k = 0; k < validKeywords.length; k++) {
            if (i !== j && j !== k && i !== k) {
              combos.push(`${validKeywords[i]}${separator}${validKeywords[j]}${separator}${validKeywords[k]}`)
            }
          }
        }
      }
    }

    // 4개 조합
    if (validKeywords.length >= 4) {
      for (let i = 0; i < validKeywords.length; i++) {
        for (let j = 0; j < validKeywords.length; j++) {
          for (let k = 0; k < validKeywords.length; k++) {
            for (let l = 0; l < validKeywords.length; l++) {
              if (i !== j && j !== k && i !== k && i !== l && j !== l && k !== l) {
                combos.push(`${validKeywords[i]}${separator}${validKeywords[j]}${separator}${validKeywords[k]}${separator}${validKeywords[l]}`)
              }
            }
          }
        }
      }
    }

    const finalCombos = removeDuplicates ? [...new Set(combos)] : combos
    setCombinations(finalCombos)

    // 기본적으로 모든 조합 선택
    const selected: {[key: string]: boolean} = {}
    finalCombos.forEach(combo => {
      selected[combo] = true
    })
    setSelectedCombinations(selected)
  }

  const toggleCombination = (combo: string) => {
    setSelectedCombinations(prev => ({
      ...prev,
      [combo]: !prev[combo]
    }))
  }

  const selectAll = () => {
    const selected: {[key: string]: boolean} = {}
    combinations.forEach(combo => {
      selected[combo] = true
    })
    setSelectedCombinations(selected)
  }

  const deselectAll = () => {
    const selected: {[key: string]: boolean} = {}
    combinations.forEach(combo => {
      selected[combo] = false
    })
    setSelectedCombinations(selected)
  }

  const copyToClipboard = () => {
    const selectedCombos = combinations.filter(combo => selectedCombinations[combo])
    navigator.clipboard.writeText(selectedCombos.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCombinations = () => {
    const selectedCombos = combinations.filter(combo => selectedCombinations[combo])
    const blob = new Blob([selectedCombos.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'keywords.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="w-full flex justify-center py-4 bg-gray-800">
          <GoogleAds slot="1234567890" className="max-w-4xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-800 rounded mb-8"></div>
            <div className="flex gap-8 justify-center">
              <div className="hidden xl:block w-72">
                <GoogleAds slot="2345678901" className="mb-4" />
              </div>
              <div className="max-w-4xl flex-1">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="h-64 bg-gray-800 rounded"></div>
                  <div className="h-64 bg-gray-800 rounded"></div>
                </div>
              </div>
              <div className="hidden xl:block w-72">
                <GoogleAds slot="5678901234" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 애드센스 상단 광고 */}
      <div className="w-full flex justify-center py-4 bg-gray-800">
        <GoogleAds slot="1234567890" className="max-w-4xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <header className="flex justify-center items-center mb-8">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="키워드메이커 로고"
              width={180}
              height={180}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2 text-white">키워드 조합 생성기</h1>
              <p className="text-gray-400">SEO 최적화를 위한 키워드 조합 도구</p>
            </div>
          </div>
        </header>

        <div className="flex gap-8 justify-center">
          {/* 왼쪽 사이드바 광고 */}
          <div className="hidden xl:block w-72 flex-shrink-0">
            <div className="sticky top-8">
              <GoogleAds slot="2345678901" className="mb-4" />
            </div>
            <div className="sticky top-80">
              <GoogleAds slot="3456789012" />
            </div>
          </div>

          {/* 메인 컨텐츠 영역 */}
          <div className="max-w-4xl flex-1">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* 입력 섹션 */}
              <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">키워드 입력</h2>
                  <div className="space-y-3">
                    {keywords.map((keyword, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={keyword}
                          onChange={(e) => updateKeyword(index, e.target.value)}
                          placeholder={`키워드 ${index + 1}`}
                          className="flex-1 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {keywords.length > 2 && (
                          <button
                            onClick={() => removeKeyword(index)}
                            className="p-2 text-red-500 hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <X size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                    {keywords.length < 10 && (
                      <button
                        onClick={addKeyword}
                        className="flex items-center gap-2 px-4 py-2 text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        <Plus size={20} />
                        키워드 추가
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">조합 옵션</h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addSpaces}
                        onChange={(e) => setAddSpaces(e.target.checked)}
                        className="rounded"
                      />
                      키워드 사이에 공백 추가
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={removeDuplicates}
                        onChange={(e) => setRemoveDuplicates(e.target.checked)}
                        className="rounded"
                      />
                      중복 키워드 자동 제거
                    </label>
                  </div>
                  <button
                    onClick={generateCombinations}
                    className="w-full mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    키워드 조합 생성
                  </button>
                </div>

                {/* 모바일용 광고 */}
                <div className="xl:hidden">
                  <GoogleAds slot="4567890123" />
                </div>
              </div>

              {/* 결과 섹션 */}
              <div className="space-y-6">
                {combinations.length > 0 && (
                  <>
                    <div className="bg-gray-800 p-6 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">생성된 키워드 조합 ({combinations.length}개)</h2>
                        <div className="flex gap-2">
                          <button
                            onClick={selectAll}
                            className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                          >
                            전체 선택
                          </button>
                          <button
                            onClick={deselectAll}
                            className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                          >
                            전체 해제
                          </button>
                        </div>
                      </div>
                      
                      <div className="max-h-96 overflow-y-auto space-y-2">
                        {combinations.map((combo, index) => (
                          <label key={index} className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedCombinations[combo] || false}
                              onChange={() => toggleCombination(combo)}
                              className="rounded"
                            />
                            <span className="text-sm">{combo}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      >
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                        {copied ? '복사됨!' : '복사하기'}
                      </button>
                      <button
                        onClick={downloadCombinations}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        <Download size={20} />
                        다운로드
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 오른쪽 사이드바 광고 */}
          <div className="hidden xl:block w-72 flex-shrink-0">
            <div className="sticky top-8">
              <GoogleAds slot="5678901234" className="mb-4" />
            </div>
            <div className="sticky top-80">
              <GoogleAds slot="6789012345" />
            </div>
          </div>
        </div>

        {/* 사용법 섹션 */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">사용법</h2>
            <div className="prose prose-invert max-w-none">
              <ol className="list-decimal list-inside space-y-2 text-gray-300 text-center">
                <li>키워드를 2개 이상 입력하세요.</li>
                <li>조합 옵션을 설정하세요.</li>
                <li>&apos;키워드 조합 생성&apos; 버튼을 클릭하세요.</li>
                <li>원하는 조합을 선택하고 복사하거나 다운로드하세요.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* 하단 광고 */}
        <div className="mt-8 flex justify-center">
          <GoogleAds slot="7890123456" className="max-w-4xl" />
        </div>
      </div>
    </div>
  )
}