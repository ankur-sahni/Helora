# Ankit Sahni Makeover — WhatsApp Template Library

**Business:** Ankit Sahni Makeover, Lahar MP
**Phone / WhatsApp:** +91 9098909088
**Instagram:** @ankitsahnimakeovers
**Tone:** Simple Indian English. Direct, polite, short sentences. No Hinglish, no marketing jargon. (Templates below still use Hinglish and need rewriting to match this rule — separate task.)
**Payment:** In-shop only. Never ask for advance or UPI. Templates below contain legacy UPI lines that have been neutralised — rewrite the surrounding flow when templates are migrated to plain English.
**Character counts exclude placeholders in `[square brackets]`.**

All `[PRICE]`, `[DATE]`, `[TIME]`, `[NAME]` are to be auto-filled by the n8n WhatsApp receptionist workflow from Supabase records. Placeholder rates below are the best-guess starting prices — update once Ankur confirms with salon owner.

---

## 1. Greeting Auto-Reply (First Message from New Customer)

**Label:** `greet_new_v1`
**When to send:** First-ever inbound WhatsApp from a number not in Supabase.
**Character count:** 312

> Namaste [NAME]! 🙏 Ankit Sahni Makeover, Lahar mein aapka swagat hai.
>
> Hum 30 saal se bridal makeup, party makeup, hair styling, threading, waxing, facial, aur nail art services de rahe hain.
>
> Bataiye kya service chahiye? Ya price list bhej dun?
>
> 1. Bridal Makeup
> 2. Party / Engagement Makeup
> 3. Hair / Threading / Facial
> 4. Price List chahiye
>
> Reply mein number bhej dijiye 🙂

**Personalisation notes:**
- `[NAME]` pulled from WhatsApp profile if available, else skip the name entirely.
- If first message contains the word "bridal" or "shaadi", jump directly to template #2 with bridal price.
- Do NOT use emojis beyond the two in the template. More emojis = looks like spam.

---

## 2. Price Enquiry Response

**Label:** `price_enquiry_v1`
**When to send:** Customer asks "kitna lagega", "price kya hai", "rate batao", or picks option 4 from the greeting.
**Character count:** 487

> Ji zaroor [NAME], yeh hamari price list hai 👇
>
> *Bridal Package (full)* — ₹[PRICE_BRIDAL_FULL]
> _(HD makeup + hair + drape + touch-up kit)_
>
> *Engagement / Party Makeup* — ₹[PRICE_PARTY]
> *Hair Styling (occasion)* — ₹[PRICE_HAIR]
> *Threading (eyebrow + upper lip)* — ₹[PRICE_THREAD]
> *Waxing (full arms + legs)* — ₹[PRICE_WAX]
> *Facial (clean-up + glow)* — ₹[PRICE_FACIAL]
> *Nail Art* — ₹[PRICE_NAIL]
>
> Bridal ke liye advance booking zaroori hai — seats limited rehti hain.
>
> Date confirm karni hai? Bataiye kab plan hai 📅

**Personalisation notes:**
- Prices are placeholders. Owner must fill these in the Supabase `services` table before the template activates.
- If customer is clearly a bride (keywords: "shaadi", "bridal", "wedding", "phere"), the message auto-promotes the bridal package to the top — other services collapse into "Full price list dekhni hai?"
- Use asterisks for bold in WhatsApp (`*text*`).

---

## 3. Booking Confirmation

**Label:** `book_confirm_v1`
**When to send:** Immediately after customer confirms date + time and agrees to advance (or walk-in).
**Character count:** 398

> Done [NAME] ji ✅
>
> *Aapki booking confirm hai:*
> Service: [SERVICE]
> Date: [DATE] (Thursday)
> Time: [TIME]
> Location: Ankit Sahni Makeover, [ADDRESS_LINE], Lahar
>
> Google Maps: [MAPS_LINK]
>
> Payment salon par karni hai. Koi bhi change ho to 4 ghante pehle bata dena.
>
> Dhanyavaad 🙏

**Personalisation notes:**
- Day of week auto-filled from `[DATE]` — helps customer double-check.
- Payment is in-shop only. No advance, no UPI, no online payment links in any template.

---

## 4. 24-Hour Reminder

**Label:** `remind_24h_v1`
**When to send:** 24 hours before `[APPOINTMENT_TIME]`.
**Character count:** 276

> Namaste [NAME] ji 🙏
>
> Kal aapki appointment hai Ankit Sahni Makeover mein:
>
> 📅 [DATE]
> ⏰ [TIME]
> 💄 [SERVICE]
>
> Patch test ya koi allergy hai to please aaj bata dijiye.
>
> Time par aa jaiyega, taki rush na ho.
>
> Kisi wajah se aana mushkil ho to abhi reply kar dijiye — hum reschedule kar denge 💛

**Personalisation notes:**
- If service is bridal, add line: "Bridal trial ke photos/video chahiye to bata dijiye."
- Do NOT send after 9 PM. Queue for 9 AM next morning if window closes at night.

---

## 5. 2-Hour Reminder

**Label:** `remind_2h_v1`
**When to send:** 2 hours before `[APPOINTMENT_TIME]`.
**Character count:** 198

> [NAME] ji, 2 ghante mein aapki appointment hai 💄
>
> ⏰ [TIME] aaj
> 📍 Ankit Sahni Makeover, Lahar
> 🗺️ [MAPS_LINK]
>
> Chai aapke liye ready rahegi ☕
>
> Raste mein ho to "OK" reply kar dijiye, hum seat laga ke rakhte hain.

**Personalisation notes:**
- The chai line is deliberate — small warm detail Indian SMBs love. Never remove it.
- If reply is not "OK" within 45 minutes of appointment, trigger the no-show recovery template.

---

## 6. No-Show Recovery

**Label:** `noshow_v1`
**When to send:** 30 minutes after scheduled time if customer didn't arrive and didn't reply.
**Character count:** 264

> [NAME] ji, aaj [TIME] par appointment thi lekin aap aa nahi paaye. Koi baat nahi, aise ho jaata hai 🙂
>
> Kya hum naya time fix kar lein? Iss hafte ke in do slots mein jagah hai:
>
> 1. [SLOT_1]
> 2. [SLOT_2]
>
> Ya aap bataiye kab convenient hai.
>
> Intezaar rahega 💛

**Personalisation notes:**
- Tone is forgiving, never accusatory. "Koi baat nahi" is load-bearing — it reduces embarrassment and keeps the customer from ghosting.
- Two slots are auto-pulled from Google Calendar availability.
- If customer doesn't reply in 72 hours, trigger re-engagement template #10 after 90 days.

---

## 7. Post-Service Thank You + Review Request

**Label:** `review_ask_v1`
**When to send:** 2 hours after appointment end time.
**Character count:** 342

> [NAME] ji, aaj aapke saath time bitaake accha laga 🌸
>
> Hope aapko service pasand aayi. Agar haan, to ek chhota sa favour — Google par 1 line ka review likh dijiye, bas 30 second lagenge 🙏
>
> Review link: [GOOGLE_REVIEW_LINK]
>
> Aapka review aur pehchaan, dono hamari agli bride tak pahunchti hai.
>
> Phir milte hain! 💛
> — Ankit Sahni Makeover

**Personalisation notes:**
- `[GOOGLE_REVIEW_LINK]` is the short Google Maps review URL — generated once and reused.
- If customer replies with a complaint instead of a review, route to owner's personal number, do NOT send Google link again.
- Never send this before 2 hours — customers still in makeup mood don't review accurately.

---

## 8. Bridal Season Broadcast

**Label:** `season_broadcast_v1`
**When to send:** Manually triggered by owner, start of wedding season (Oct–Dec, Apr–Jun). Send in batches of 50/day to avoid WhatsApp block.
**Character count:** 438

> Namaste 🙏
>
> Shaadi ka season aa gaya! Ankit Sahni Makeover mein is baar bride package mein kuch naya hai:
>
> ✨ HD Airbrush Makeup
> ✨ 3-hour touch-up kit free
> ✨ Pre-wedding trial included
> ✨ Hair + drape included
>
> *Special offer:* October se December booking par ₹[DISCOUNT_AMOUNT] off — sirf pehle 10 brides ke liye.
>
> Date block karni ho to "BRIDAL" reply kar dijiye. Hum call back kar ke details share karenge.
>
> — Ankit Sahni Makeover, Lahar (since 1994)

**Personalisation notes:**
- Only send to customers who opted in OR were already customers. Never cold-blast unknown numbers — WhatsApp will block the business number.
- Limit: 50 messages/day maximum.
- "Since 1994" line is crucial — 30-year legacy is Sahni's biggest differentiator.

---

## 9. Referral Ask (After Bridal Booking)

**Label:** `referral_ask_v1`
**When to send:** 3 days after a completed bridal appointment.
**Character count:** 358

> [NAME] ji, umeed hai aapki shaadi ki taiyaari ke baad sab acha gaya 🌸
>
> Ek request hai — agar aapki koi cousin, behen, ya saheli bhi shaadi plan kar rahi hai aur bridal makeup artist dhoondh rahi hai, humara naam recommend kar dijiye.
>
> Aapke reference par unhein ₹[REFERRAL_DISCOUNT] ki discount milegi, aur aapko bhi next service par ₹[YOUR_DISCOUNT] off.
>
> Bas unka number bhej dijiye 💛

**Personalisation notes:**
- Double-sided referral reward is deliberate — single-sided rewards underperform in Indian SMB context.
- Don't send before 3 days; bride needs time to post her wedding photos and feel good about the service first.
- Track referrals in Supabase `referrals` table so we can pay out correctly.

---

## 10. Re-Engagement (3+ Months No Visit)

**Label:** `reengage_v1`
**When to send:** Automated trigger when `last_visit > 90 days` AND customer was not marked "do not contact".
**Character count:** 318

> Namaste [NAME] ji 🙏
>
> Kaafi time ho gaya aapko dekhe hue. Sab theek hai na?
>
> Is mahine humne kuch naye services add kiye hain:
>
> • Express facial (30 min, ₹[PRICE])
> • Hair spa + head massage (45 min, ₹[PRICE])
> • Threading combo (eyebrow + upper lip + forehead, ₹[PRICE])
>
> Agar time mile to ek baar aa jaiyega. Aapki pasand ki service pe ₹[LOYAL_DISCOUNT] off rahega 💛

**Personalisation notes:**
- Opening line "Sab theek hai na?" is warm, not salesy — critical for tone.
- Only send once per 90-day window per customer. Twice = spam territory.
- If no reply after 2 re-engagement attempts (180 days apart), move customer to "dormant" segment, stop sending broadcasts.

---

## Template Operations

- All templates live in Supabase `whatsapp_templates` table with columns: `label`, `language`, `body`, `variables[]`, `active`.
- n8n receptionist workflow selects template by label, substitutes variables, sends via WhatsApp Business API.
- Change log: every template edit must be committed to this file with date + reason. No silent edits.
- WhatsApp Business API rule: templates #1, #2 are freeform (customer-initiated, 24hr window). Templates #4, #5, #7, #8, #9, #10 are proactive and must be registered as official templates with Meta.

**Last edited:** 2026-04-18 (initial version, Ankur).
