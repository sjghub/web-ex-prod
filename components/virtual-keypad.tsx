"use client";

import { useState, useEffect } from "react";
import { X, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VirtualKeypadProps {
  onKeyPress: (key: string) => void;
  onClose: () => void;
  shuffle?: boolean;
}

export function VirtualKeypad({
  onKeyPress,
  onClose,
  shuffle = true,
}: VirtualKeypadProps) {
  const [keys, setKeys] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ]);

  const shuffleKeys = () => {
    if (shuffle) {
      const shuffledKeys = [...keys];
      for (let i = shuffledKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledKeys[i], shuffledKeys[j]] = [shuffledKeys[j], shuffledKeys[i]];
      }
      setKeys(shuffledKeys);
    }
  };

  useEffect(() => {
    if (shuffle) {
      shuffleKeys();
    }
  }, [shuffle]);

  const getGridKeys = () => {
    const grid = [...keys];
    while (grid.length < 11) grid.push(""); // 빈 칸 채우기
    grid.push("backspace");
    return grid;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border p-4 w-[280px] absolute z-20">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-sm">보안 키패드</h3>
        <div className="flex gap-2">
          {shuffle && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-gray-100"
              onClick={shuffleKeys}
              title="키패드 섞기"
            >
              <Shuffle className="h-4 w-4" />
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-gray-100"
            onClick={onClose}
            title="키패드 닫기"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {getGridKeys().map((key, index) =>
          key === "" ? (
            <div key={index} />
          ) : (
            <Button
              key={key}
              type="button"
              variant="outline"
              className="h-12 text-lg font-medium hover:bg-gray-100"
              onClick={() => onKeyPress(key)}
            >
              {key === "backspace" ? "←" : key}
            </Button>
          ),
        )}
      </div>
    </div>
  );
}
