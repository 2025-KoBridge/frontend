'use client';

import Button from '@/components/buttons/_index';
import { useUserStore } from '@/stores/userStore';
import Image from 'next/image';

export default function MyPage() {
  const { username } = useUserStore();
  // TODO: 구조 리팩토링
  return (
    <div className="flex flex-col">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-h1-bold text-black">{username}</h1>
        <Image
          src="/icons/setting.svg"
          alt="Settings"
          width={24}
          height={24}
          className="cursor-pointer pb-1"
        />
      </div>
      {/* 통계 영역 */}
      <div className="flex justify-around items-center py-4 px-6">
        <div className="flex flex-col items-center">
          <span className="text-bd1-regular text-gray-300 flex items-center gap-1">
            총 공부 시간
            <Image
              src="/icons/book.svg"
              alt="book"
              width={16}
              height={16}
              className="pb-0.5"
            />
          </span>
          <span className="text-h1-bold text-secondary-300 mt-1">02:26</span>
        </div>
        <div className="w-px h-14 bg-gray-700 mb-2"></div>
        <div className="flex flex-col items-center">
          <span className="text-bd1-regular text-gray-300 flex items-center gap-1">
            총 대화 시간
            <Image
              src="/icons/call.svg"
              alt="call"
              width={16}
              height={16}
              className="pb-0.5"
            />
          </span>
          <span className="text-h1-bold text-secondary-300 mt-1">01:03</span>
        </div>
      </div>

      {/* 저장한 표현 버튼 */}
      <div className="mx-6 mt-4">
        <Button
          text={'저장한 표현'}
          btnColor="bg-primary-900"
          iconPath="/icons/bookmark-unchecked-black.svg"
        />
      </div>
      {/* 메뉴 리스트 */}
      <div className="mt-12 flex flex-col divide-y divide-gray-900 ">
        <button className="flex justify-between items-center px-4 py-4 text-left">
          <div>
            <p className="text-black text-bd1-regular">코디 목소리 변경</p>
            <p className="text-gray-500 text-trans-cp2-regular">
              Change Kody&apos;s voice
            </p>
          </div>
          <Image
            src="/icons/chevron-right.svg"
            alt="arrow"
            width={24}
            height={24}
          />
        </button>

        <button className="flex justify-between items-center px-4 py-4 text-left">
          <div>
            <p className="text-black text-bd1-regular">로그아웃</p>
            <p className="text-gray-500 text-trans-cp2-regular">Log out</p>
          </div>
          <Image
            src="/icons/chevron-right.svg"
            alt="arrow"
            width={24}
            height={24}
          />
        </button>

        <button className="flex items-center justify-end px-4 py-4 text-right">
          <div>
            <p className="text-black text-bd1-regular">회원 탈퇴</p>
            <p className="text-gray-500 text-trans-cp2-regular">
              Delete Account
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
