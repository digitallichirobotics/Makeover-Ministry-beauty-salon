import { ArrowUpRight, Star } from 'lucide-react';

type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
};

const reviews: Review[] = [];
const previewReviews: Review[] = [
  { author: 'Hair Styling', rating: 5, text: 'I loved how my stylist listened to what I wanted and showed me how to style my new cut at home.' },
  { author: 'Skin & Facials', rating: 5, text: 'The facial was relaxing, and the team explained each step before getting started.' },
  { author: 'Makeup Artistry', rating: 5, text: 'My makeup felt light and stayed in place throughout the event.' },
  { author: 'Hair Colour', rating: 5, text: 'We talked through the shade together, and I loved how it looked in natural light.' },
  { author: 'Men’s Grooming', rating: 5, text: 'I came in for a trim and left with exactly the cut and beard shape I asked for.' },
  { author: 'Spa & Wellness', rating: 5, text: 'The team gave me time to settle in, and I left feeling refreshed.' },
];
const reviewUrl = process.env.NEXT_PUBLIC_SALON_REVIEW_URL?.trim();

export default function Reviews() {
  const isPreview = reviews.length === 0;
  const displayedReviews = isPreview ? previewReviews : reviews;

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="section-pad scroll-mt-20 overflow-hidden bg-[#271728] bg-[radial-gradient(ellipse_at_bottom,#944b72_0%,#512747_46%,#271728_82%)] text-[#fffaf4]">
      <div className="container-wide">
        <h2 id="reviews-heading" className="mb-8 text-center text-4xl leading-tight md:text-6xl">Client Reviews</h2>
        {isPreview && <p className="mb-8 text-center text-sm text-[#f5d8e9]">Sample reviews for layout preview</p>}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayedReviews.map(({ author, rating, text }) => (
              <figure key={JSON.stringify([author, text])} className="flex min-h-56 flex-col rounded-[2rem] border border-white/10 bg-[#21121f]/75 p-7 shadow-lg lg:nth-[3n+2]:translate-y-5">
                <div role="img" aria-label={`${rating} out of 5 stars`} className="mb-5 flex gap-2 text-[#fff0d7]">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} size={21} fill={star <= rating ? 'currentColor' : 'none'} aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mb-6 leading-7">“{text}”</blockquote>
                <figcaption className="mt-auto flex items-center gap-3 text-sm font-semibold">
                  <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-[#703852] text-[#fff0d7]">{author.charAt(0)}</span>
                  <span>{author}{isPreview && <span className="block font-normal text-[#f5d8e9]">Sample review</span>}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        {reviewUrl && (
          <div className="mt-12 text-center">
            <a href={reviewUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
              Leave a Review <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
