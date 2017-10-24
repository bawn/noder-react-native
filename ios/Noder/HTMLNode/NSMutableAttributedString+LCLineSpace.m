//
//  NSMutableAttributedString+HQLineSpace.m
//  Mark
//
//  Created by bawn on 12/11/15.
//  Copyright © 2015 huoqiu. All rights reserved.
//


#import <UIKit/UIKit.h>

#import "NSMutableAttributedString+LCLineSpace.h"
#import "UIColor+LCColor.h"

static NSString * const kLinkAttributeName = @"kLinkAttributeName";

static CGFloat const kLineHeight = 5.0f;


@implementation NSMutableAttributedString (HQLineSpace)



+ (id)hqAttributedWithString:(NSString *)string
                        font:(UIFont *)font
                       color:(UIColor *)color
                   lineSpace:(CGFloat)lineSpace
                   alignment:(NSTextAlignment)alignment{
    if (string.length && string) {
        NSRange rang = NSMakeRange(0, string.length);
        NSDictionary *attributes = @{
                                     NSFontAttributeName:font,
                                     NSForegroundColorAttributeName : color
                                     };
        NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:string];
        [attributedString addAttributes:attributes range:rang];
        NSMutableParagraphStyle *paragraphStyle = [[NSMutableParagraphStyle alloc] init];
        paragraphStyle.lineSpacing = lineSpace;
        paragraphStyle.alignment = alignment;
        [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:rang];
        return attributedString.copy;
    }
    return nil;
}


+ (NSAttributedString *)attributedWithPString:(NSString *)string{
    UIFont *font = [UIFont systemFontOfSize:15.0f];
    UIColor *color = [UIColor lcBlackColor];
    return [self hqAttributedWithString:string
                                   font:font
                                  color:color
                              lineSpace:kLineHeight
                              alignment:NSTextAlignmentLeft];
}

+ (NSAttributedString *)attributedWithH1String:(NSString *)string{
    UIFont *font = [UIFont systemFontOfSize:24.0f weight:UIFontWeightSemibold];
    UIColor *color = [UIColor lcBlackColor];
    return [self hqAttributedWithString:string
                                   font:font
                                  color:color
                              lineSpace:kLineHeight
                              alignment:NSTextAlignmentLeft];

}

+ (NSAttributedString *)attributedWithH2String:(NSString *)string{
    UIFont *font = [UIFont systemFontOfSize:20.0f weight:UIFontWeightSemibold];
    UIColor *color = [UIColor lcBlackColor];
    return [self hqAttributedWithString:string
                                   font:font
                                  color:color
                              lineSpace:kLineHeight
                              alignment:NSTextAlignmentLeft];
}

+ (NSAttributedString *)attributedWithH3String:(NSString *)string{
    UIFont *font = [UIFont systemFontOfSize:18.0f weight:UIFontWeightSemibold];
    UIColor *color = [UIColor lcBlackColor];
    return [self hqAttributedWithString:string
                                   font:font
                                  color:color
                              lineSpace:kLineHeight
                              alignment:NSTextAlignmentLeft];
}


+ (NSAttributedString *)attributedWithPString:(NSString *)pString
                                 aStringArray:(NSArray<NSString *> *)aStringArray
                                    hrefArray:(NSArray *)hrefArray{
    
    if (pString.length && pString) {
        
        UIFont *pFont = [UIFont systemFontOfSize:15.0f];
        UIColor *pColor = [UIColor lcBlackColor];
        
        NSRange pRang = NSMakeRange(0, pString.length);
        NSDictionary *pAttributes = @{
                                     NSFontAttributeName:pFont,
                                     NSForegroundColorAttributeName : pColor
                                     };
        NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:pString];
        
        [attributedString addAttributes:pAttributes range:pRang];
       
        UIFont *aFont = [UIFont systemFontOfSize:15.0f];
        UIColor *aColor = [UIColor lcBlueColor];
        
        [aStringArray enumerateObjectsUsingBlock:^(NSString *obj, NSUInteger idx, BOOL * _Nonnull stop) {
            NSRange aRang = [pString rangeOfString:obj];
            NSDictionary *aAttributes = @{
                                          kLinkAttributeName : [NSURL URLWithString:hrefArray[idx]],
                                          NSFontAttributeName: aFont,
                                          NSForegroundColorAttributeName : aColor,
                                          };
            [attributedString addAttributes:aAttributes range:aRang];
        }];

        
       
        NSMutableParagraphStyle *paragraphStyle = [[NSMutableParagraphStyle alloc] init];
        paragraphStyle.lineSpacing = 4;
        paragraphStyle.alignment = NSTextAlignmentLeft;
        [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:pRang];
        
        
        return attributedString;
    }
    return nil;
}

+ (NSAttributedString *)attributedWithLiString:(NSString *)liString
                                  aStringArray:(NSArray *)aStringArray
                                     hrefArray:(NSArray *)hrefArray{
    if (liString.length && liString) {
        
        UIFont *pFont = [UIFont systemFontOfSize:14.0f];
        UIColor *pColor = [UIColor lcBlackColor];
        
        NSRange pRang = NSMakeRange(0, liString.length);
        NSDictionary *pAttributes = @{
                                      NSFontAttributeName:pFont,
                                      NSForegroundColorAttributeName : pColor
                                      };
        NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:liString];
        
        [attributedString addAttributes:pAttributes range:pRang];
        
        UIFont *aFont = [UIFont systemFontOfSize:15.0f];
        UIColor *aColor = [UIColor lcBlueColor];
        
        [aStringArray enumerateObjectsUsingBlock:^(NSString *obj, NSUInteger idx, BOOL * _Nonnull stop) {
            NSRange aRang = [liString rangeOfString:obj];
            NSDictionary *aAttributes = @{
                                          kLinkAttributeName : [NSURL URLWithString:hrefArray[idx]],
                                          NSFontAttributeName:aFont,
                                          NSForegroundColorAttributeName : aColor,
                                          };
            [attributedString addAttributes:aAttributes range:aRang];
        }];
        
        
        
        NSMutableParagraphStyle *paragraphStyle = [[NSMutableParagraphStyle alloc] init];
        paragraphStyle.lineSpacing = 4;
        paragraphStyle.alignment = NSTextAlignmentLeft;
        [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:pRang];
        
        
        return attributedString;
    }
    return nil;

}

+ (NSAttributedString *)aContentAttributedWithString:(NSString *)string{
    UIFont *font = [UIFont systemFontOfSize:15.0f];
    UIColor *color = [UIColor lcBlackColor];
    if (string.length && string) {
        NSRange rang = NSMakeRange(0, string.length);
        NSDictionary *attributes = @{
                                     
                                     NSFontAttributeName:font,
                                     NSForegroundColorAttributeName : color
                                     };
        NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:string];
        [attributedString addAttributes:attributes range:rang];
        NSMutableParagraphStyle *paragraphStyle = [[NSMutableParagraphStyle alloc] init];
        paragraphStyle.lineSpacing = kLineHeight;
        paragraphStyle.alignment = NSTextAlignmentLeft;
        [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:rang];
        return attributedString.copy;
    }
    return nil;
}

@end
