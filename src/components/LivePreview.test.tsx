import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LivePreview } from './LivePreview';

describe('LivePreview 반응형 뷰', () => {
  const mockCode = 'export default () => <div>테스트</div>';

  it('반응형 뷰 버튼 3개를 렌더링해야 함', () => {
    render(<LivePreview code={mockCode} />);

    const mobileBtn = screen.getByTitle('모바일 뷰');
    const tabletBtn = screen.getByTitle('태블릿 뷰');
    const desktopBtn = screen.getByTitle('데스크톱 뷰');

    expect(mobileBtn).toBeInTheDocument();
    expect(tabletBtn).toBeInTheDocument();
    expect(desktopBtn).toBeInTheDocument();
  });

  it('초기 상태는 데스크톱 뷰여야 함', () => {
    render(<LivePreview code={mockCode} />);

    const desktopBtn = screen.getByTitle('데스크톱 뷰');
    expect(desktopBtn).toHaveClass('active');
  });

  it('모바일 버튼 클릭 시 활성 상태가 변경되어야 함', async () => {
    const user = userEvent.setup();
    render(<LivePreview code={mockCode} />);

    const mobileBtn = screen.getByTitle('모바일 뷰');
    const desktopBtn = screen.getByTitle('데스크톱 뷰');

    await user.click(mobileBtn);

    expect(mobileBtn).toHaveClass('active');
    expect(desktopBtn).not.toHaveClass('active');
  });

  it('태블릿 버튼 클릭 시 활성 상태가 변경되어야 함', async () => {
    const user = userEvent.setup();
    render(<LivePreview code={mockCode} />);

    const tabletBtn = screen.getByTitle('태블릿 뷰');
    const desktopBtn = screen.getByTitle('데스크톱 뷰');

    await user.click(tabletBtn);

    expect(tabletBtn).toHaveClass('active');
    expect(desktopBtn).not.toHaveClass('active');
  });

  it('모바일 뷰 선택 시 preview-mobile 클래스가 적용되어야 함', async () => {
    const user = userEvent.setup();
    const { container } = render(<LivePreview code={mockCode} />);

    const mobileBtn = screen.getByTitle('모바일 뷰');
    await user.click(mobileBtn);

    const previewRender = container.querySelector('.preview-render');
    expect(previewRender).toHaveClass('preview-mobile');
  });

  it('태블릿 뷰 선택 시 preview-tablet 클래스가 적용되어야 함', async () => {
    const user = userEvent.setup();
    const { container } = render(<LivePreview code={mockCode} />);

    const tabletBtn = screen.getByTitle('태블릿 뷰');
    await user.click(tabletBtn);

    const previewRender = container.querySelector('.preview-render');
    expect(previewRender).toHaveClass('preview-tablet');
  });

  it('데스크톱 뷰 선택 시 preview-desktop 클래스가 적용되어야 함', () => {
    const { container } = render(<LivePreview code={mockCode} />);

    const previewRender = container.querySelector('.preview-render');
    expect(previewRender).toHaveClass('preview-desktop');
  });

  it('여러 버튼 클릭 시 올바른 뷰만 활성화되어야 함', async () => {
    const user = userEvent.setup();
    render(<LivePreview code={mockCode} />);

    const mobileBtn = screen.getByTitle('모바일 뷰');
    const tabletBtn = screen.getByTitle('태블릿 뷰');
    const desktopBtn = screen.getByTitle('데스크톱 뷰');

    await user.click(mobileBtn);
    expect(mobileBtn).toHaveClass('active');

    await user.click(tabletBtn);
    expect(mobileBtn).not.toHaveClass('active');
    expect(tabletBtn).toHaveClass('active');

    await user.click(desktopBtn);
    expect(tabletBtn).not.toHaveClass('active');
    expect(desktopBtn).toHaveClass('active');
  });
});
