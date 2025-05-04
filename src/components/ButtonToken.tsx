import React, {forwardRef} from 'react';
import {IconCheck} from '@/assets/icons/Check';

type TokenButtonProps = {
  icon?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  tokenName?: string
  tokenAmount?: string
  tokenDescription?: string
  className?: string
  type: 'usual' | 'exchange'
  chosen?: boolean
  isExchangeIn?: boolean
}
export const ButtonToken = forwardRef<HTMLButtonElement, TokenButtonProps>(({
                                                                              icon,
                                                                              onClick,
                                                                              tokenName,
                                                                              tokenDescription,
                                                                              tokenAmount,
                                                                              className,
                                                                              type,
                                                                              chosen,
                                                                              isExchangeIn
                                                                            },
                                                                            ref
) => {
  return (
    <button
      className={`w-full bg-base rounded-[16px] p-4 flex items-center justify-between overflow-hidden ${className}`}
      ref={ref}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {icon && <img src={icon} alt="" className="w-8 h-8 shrink-0"/>}
        <div className="flex flex-col min-w-0 items-center">
          <p className="break-all uppercase">{tokenName}</p>
          <p className="break-all text-gray/50 text-sm max-w-3/4 text-center">{tokenDescription}</p>
        </div>
      </div>

      <div className="w-[24px] h-[24px] shrink-0">
        {chosen ? <IconCheck/> : null}
      </div>
    </button>
  );
});
