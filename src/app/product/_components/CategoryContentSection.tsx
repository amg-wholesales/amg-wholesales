// components/category/CategoryContentSection.tsx

import { getCategoryContent, CategoryContent, ContentBlock, CategorySection } from './CategoryContent';

interface CategoryContentSectionProps {
  categoryKey: string;
}

const CategoryContentSection: React.FC<CategoryContentSectionProps> = ({ categoryKey }) => {
  const content = getCategoryContent(categoryKey);

  if (!content) {
    return null; // Don't render anything if no content exists for this category
  }

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'heading':
        const HeadingTag = block.level === 2 ? 'h2' : block.level === 3 ? 'h3' : 'h4';
        return (
          <HeadingTag
            key={index}
            className={`font-semibold text-gray-900 mb-4 ${
              block.level === 2 
                ? 'text-2xl md:text-3xl border-b border-gray-200 pb-3' 
                : block.level === 3
                ? 'text-xl md:text-2xl mt-6 first:mt-0'
                : 'text-lg md:text-xl mt-4 first:mt-0 text-gray-800'
            }`}
          >
            {block.text}
          </HeadingTag>
        );

      case 'paragraph':
        return (
          <p
            key={index}
            className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base"
          >
            {block.text}
          </p>
        );

      case 'points':
        return (
          <ul
            key={index}
            className="space-y-3 mb-8 text-sm md:text-base"
          >
            {block.items?.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="flex items-start text-gray-700"
              >
                <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  const renderSection = (section: CategorySection, sectionIndex: number) => {
    return (
      <div 
        key={sectionIndex} 
        className={`${sectionIndex > 0 ? 'border-t border-gray-100 pt-10 mt-10' : ''}`}
      >
        {/* Section Title */}
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
            {sectionIndex + 1}
          </span>
          {section.sectionTitle}
        </h3>

        {/* Section Content */}
        <div className="ml-9">
          {section.content.map((block, blockIndex) => renderContentBlock(block, blockIndex))}
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white border border-gray-100 mt-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-1 h-8 bg-red-500 mr-4"></div>
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">
              {content.categoryName}
            </h1>
            {content.description && (
              <p className="text-xs md:text-sm text-gray-600 mt-2 max-w-4xl">
                {content.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="p-6 md:p-8 lg:p-10">
        <div className="max-w-4xl">
          {content.sections.map((section, sectionIndex) => renderSection(section, sectionIndex))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-6 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-gray-600">
            <p className="font-medium mb-1">Need help choosing the right product?</p>
            <p>Contact our experts for personalized recommendations.</p>
          </div>
          <button className="bg-black text-white px-6 py-2.5 text-xs font-medium hover:bg-gray-900 transition-colors rounded-sm">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryContentSection;