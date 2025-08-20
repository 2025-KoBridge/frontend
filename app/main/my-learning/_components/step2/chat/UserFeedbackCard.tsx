import Image from 'next/image';

interface FeedbackCardProps {
  userInput: string;
  translation: string;
  correction: string;
  explanation: string;
}

export default function FeedbackCard({
  userInput,
  translation,
  correction,
  explanation,
}: FeedbackCardProps) {
  return (
    <div className="flex items-end justify-end gap-1 mt-4 mb-11">
      <Image
        src={'/icons/bookmark-unchecked.svg'}
        alt={'bookmark'}
        width={16}
        height={16}
        className="pb-12"
      />
      <div className="bg-primary-900 rounded-2xl max-w-md overflow-hidden min-w-3/4 ">
        {/* user text*/}
        <div className="bg-primary-800 px-5 py-3 rounded-2xl rounded-br-sm text-black text-bd2-regular">
          {userInput}
        </div>

        {/* 번역 */}
        <div className=" border-white border-b-2 px-5 py-2 text-sm text-black text-cp2-regular">
          {translation}
        </div>

        {/* 올바른 한국어 */}
        <div className="border-white border-b-2 px-5 py-2 text-sm text-black text-cp2-regular">
          {correction}
        </div>

        {/* 설명 */}
        <div className="px-5 py-2 text-sm text-black text-cp2-regular">
          {explanation}
        </div>
      </div>
    </div>
  );
}
