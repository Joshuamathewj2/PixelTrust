class DomainInterpreter:
    def interpret(self, result):
        raise NotImplementedError

class FoodInterpreter(DomainInterpreter):
    def interpret(self, result):
        if result["score"] < 60:
            return "This food imagery shows unrealistic textures and shading typical of generative AI. This likely misleads consumers regarding the actual quality and appearance of the dish."
        return "The food imagery aligns with standard culinary photography. No deceptive AI enhancements detected."

class NewsInterpreter(DomainInterpreter):
    def interpret(self, result):
        if result["score"] < 40:
            return "HIGH MISINFORMATION RISK. This image shows critical geometric and frequency anomalies often found in propaganda-focused deepfakes. Public dissemination is not recommended."
        elif result["score"] < 75:
            return "Digital manipulation detected. The context of the scene may have been staged or altered to shift public perception."
        return "No significant digital tampering detected in this news media. Image appears consistent with captured reality."

class LegalInterpreter(DomainInterpreter):
    def interpret(self, result):
        if result["score"] < 90:
            return "COURT ADMISSIBILITY WARNING. Minor pixel-level inconsistencies detected. Even slight anomalies can jeopardize the chain-of-custody validity in legal proceedings."
        return "Forensic-grade integrity confirmed. Metadata and pixel structures are consistent with an unaltered capture device."

class MarketplaceInterpreter(DomainInterpreter):
    def interpret(self, result):
        if result["score"] < 70:
            return "POTENTIAL COUNTERFEIT. Product logos and materials exhibit synthetic repetition patterns. This image may be a 3D render or AI-generated to mimic a genuine product."
        return "Product imagery appears authentic. Materials and brand markings show natural light response and manufacturing noise."

def get_interpreter(domain):
    interpreters = {
        "food-delivery": FoodInterpreter(),
        "fake-news": NewsInterpreter(),
        "legal-evidence": LegalInterpreter(),
        "online-marketplaces": MarketplaceInterpreter()
    }
    return interpreters.get(domain, DomainInterpreter())
